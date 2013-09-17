class ResponseController < ApplicationController
  skip_before_filter :set_var
  skip_before_filter :authenticate_user!, :only=>[:res]

  def compaign_score(user_id)
    @score=Array.new
    @current_user=User.find(user_id)
    User.all.each do |u|
      @questions=Array.new
      Question.all.each do |q|
        @questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
      end
      @questions=@questions.uniq.flatten!
      @score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      if (u==@current_user)
        @points=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
        @user_score=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }
      end
    end
    @rank= @score.sort().reverse.index(@points)+1 rescue ''
  end

  def create_response
    @option=Option.find(params[:option][0].to_i)
    @response=Response.create(:user_id => current_user.id, :question_id => @option.question.id, :option_id => @option.id, :answer => @option.name)
    if @response.created_at<@option.question.happy_hr and @option.is_correct
      @response.points=@option.question.quiz.plus+(@option.question.quiz.plus*2)
    elsif @option.is_correct
      @response.points=@option.question.quiz.plus
    elsif @response.created_at<@option.question.happy_hr
      @response.points=0
    else
      @response.points= -(@option.question.quiz.minus)
    end
    @response.save
    render :text => "#{@response.id}"
    return
  end

  def add_bonus

    @response=Response.find((params[:response][0]).to_i)
    @response.promotion=true
    #render :text => (params[:response][0])
    #return
    if @response.option.is_correct
      @response.points=@response.points+@response.option.question.quiz.plus*2
    else
      @response.points=@response.points-@response.option.question.quiz.plus*2
    end

    if @response.created_at<@response.option.question.happy_hr and !@response.option.is_correct
      @response.points=0
    end
    @response.save
    render :text => @response.points
    return
  end

  def load_question
    if Date.strptime(params[:question][0],"%Y-%m-%d")!=Date.today
      @question = Question.where('insertion_date BETWEEN ? AND ?', Date.strptime(params[:question][0], "%Y-%m-%d").beginning_of_day, Date.strptime(params[:question][0], "%Y-%m-%d").end_of_day).first
      #@question=Question.find_all_by_insertion_date(Date.strptime(params[:question][0],"%Y-%m-%d")).first
      if @question.nil?
        render :text => "Not Found"
        return
      else
        @option = Option.find_all_by_question_id(@question.id)
        @correct=Option.find_by_question_id_and_is_correct(@question.id, true).id
        render :text => "#{@question.name}|#{@option[0].id};#{@option[0].name}|#{@option[1].id};#{@option[1].name}|#{@option[2].id};#{@option[2].name}|#{@option[3].id};#{@option[3].name}|#{@correct}|#{@question.id}|#{@question.view_article}"
      end
    else
      render :text=>"Not Found"  
    end  
  end

  def add_bonus_tt
    @response=Response.find((params[:response][0]).to_i)
    @response.promotion=true
    if @response.option.is_correct
      @response.points=@response.points+@response.option.question.quiz.plus*3
    else
      @response.points=@response.points-@response.option.question.quiz.plus*3
    end

    if @response.created_at<@response.option.question.happy_hr and !@response.option.is_correct
      @response.points=0
    end
    @response.save
    render :text => @response.points
    return
  end

  def send_ref_mail
    @emails=params[:email][0]
    @eaddresses=@emails.split(',')
    @eaddresses.each do |eaddr|
      NotificationMailer.welcome_email(eaddr).deliver
      @referral=Referral.create(:user_id => current_user.id,:referred_mail => eaddr)
    end
    render :text => "OK"
    return
  end

  #require 'gruff'

  #require File.dirname(__FILE__) + "/gruff_test_case"
  def view_question_stat
    @question=Question.find(params[:id])
    @responses=Response.find_all_by_question_id(@question.id)
    @age1=(@responses.map { |i| i.user.id } & User.all(:conditions => ["age < ?", 18]).map { |i| i.id }).count
    @age2=(@responses.map { |i| i.user.id } & User.all(:conditions => ["age > ?", 18]).map { |i| i.id } & User.all(:conditions => ["age < ?", 25]).map { |i| i.id }).count
    @age3=(@responses.map { |i| i.user.id } & User.all(:conditions => ["age > ?", 25]).map { |i| i.id } & User.all(:conditions => ["age < ?", 35]).map { |i| i.id }).count
    @age4=(@responses.map { |i| i.user.id } & User.all(:conditions => ["age > ?", 35]).map { |i| i.id } & User.all(:conditions => ["age < ?", 45]).map { |i| i.id }).count
    @age5=(@responses.map { |i| i.user.id } & User.all(:conditions => ["age > ?", 45]).map { |i| i.id }).count

    @datasets=[
        [:lt18, @age1],
        [:lt25, @age2],
        [:lt35, @age3],
        [:lt45, @age4],
        [:gt45, @age5],
    ]

    g = Gruff::Pie.new
    g.title = "Visual Pie Age"
    @datasets.each do |data|
      g.data(data[0], data[1])
    end

    @ages=g.write("#{Rails.root}/public/pie_keynote.png")
    @image1="pie_keynote.png"

    @locations=@responses.map { |i| i.user.location }
    h = Gruff::Pie.new
    h.title = "Location"
    @locations.uniq.each do |loc|
      h.data(loc, @locations.grep(loc).count)
    end
    h.write("#{Rails.root}/public/piel.png")
    @image2="piel.png"

    @industries=@responses.map { |i| i.user.industry }
    i = Gruff::Pie.new
    i.title = "Industry"
    @industries.uniq.each do |loc|
      i.data(loc, @industries.grep(loc).count)
    end
    i.write("#{Rails.root}/public/industry.png")
    @image3="industry.png"

    @workexs=@responses.map { |i| i.user.workx }
    #render :text => @workexs
    #return
    j = Gruff::Pie.new
    j.title = "Experience"
    @workexs.uniq.each do |loc|
      j.data(loc, @workexs.grep(loc).count)
    end
    j.write("#{Rails.root}/public/workx.png")
    @image4="workx.png"
  end


  def user_reg
    render :text => "testing"
    return
  end

  def res
    #render :text=>params
    #return
    if params[:auth]=="5226a0cc9ee6987df1000010"
      #render :text=>"Welcome to Win with ET. Thank you for playing. Join us on kyet.ptotem.com . Play daily to win exciting daily and weekly prizes and one month-end Grand Prize."
      #return

      @a=""

      if User.find_by_username(params[:uname]).nil?
        @user=User.create(:email => 'abc1@gmail.com', :username => params[:uname], :password => "password", :password_confirmation => "password");
        @a="Welcome to Win with ET. Thank you for playing. Join us on kyet.ptotem.com using the following password to login:'password'. Play daily to win exciting daily and weekly prizes and one month-end Grand Prize."
      else
        @user=User.find_by_username(params[:uname])
      end
      @question = Question.find_by_insertion_date(Date.today)
      #if Time.now> @question.closing_time
        # render :text=>"late response"
        #return
      #else



      if params[:message].include?("WINETD")
        @question = Question.find_by_insertion_date(Date.today)
        @selected_option=params[:message].split(' ')[1]
        case @selected_option
          when "A" #compare to 1
            @option=@question.options[0]
          when "B" #compare to 2
            @option=@question.options[1]
          when "C"
            @option=@question.options[2]
          when "D"
            @option=@question.options[3]
          else
            render :text =>"Wrong Option Selected"
            return
        end

        @response=Response.create(:user_id => @user.id, :question_id => @question.id, :option_id => @option.id, :answer => @option.name)
        if @response.created_at<@option.question.happy_hr and @option.is_correct
          @response.points=@option.question.quiz.plus+(@option.question.quiz.plus*2)
        elsif @option.is_correct
          @response.points=@option.question.quiz.plus
        elsif @response.created_at<@option.question.happy_hr
          @response.points=0
        else
          @response.points= -(@option.question.quiz.minus)
        end
        @response.save
        @response.promotion=true
        if @response.option.is_correct
          @response.points=@response.points+@response.option.question.quiz.plus*2
        else
          @response.points=@response.points-@response.option.question.quiz.plus*2
        end

        if @response.created_at<@response.option.question.happy_hr and !@response.option.is_correct
          @response.points=0
        end
        @response.save
        render :text=>@a+"Thank you for playing Double Trouble on Win with ET. Your answer has been recorded. You shall be informed if you were right or wrong by 8PM. Visit kyet.ptotem.com to see your score"
        return
      elsif params[:message].include?("WINETT")
        @question = Question.find_by_insertion_date(Date.today)

        @selected_option=params[:message].split(' ')[1]
        case @selected_option
          when "A" #compare to 1
            @option=@question.options[0]
          when "B" #compare to 2
            @option=@question.options[1]
          when "C"
            @option=@question.options[2]
          when "D"
            @option=@question.options[3]
          else
            render :text =>"Wrong Option Selected"
            return
        end
        @response=Response.create(:user_id => @user.id, :question_id => @question.id, :option_id => @option.id, :answer => @option.name)
        if @response.created_at<@option.question.happy_hr and @option.is_correct
          @response.points=@option.question.quiz.plus+(@option.question.quiz.plus*2)
        elsif @option.is_correct
          @response.points=@option.question.quiz.plus
        elsif @response.created_at<@option.question.happy_hr
          @response.points=0
        else
          @response.points= -(@option.question.quiz.minus)
        end
        @response.save
        @response.promotion=true
        if @response.option.is_correct
          @response.points=@response.points+@response.option.question.quiz.plus*3
        else
          @response.points=@response.points-@response.option.question.quiz.plus*3
        end

        if @response.created_at<@response.option.question.happy_hr and !@response.option.is_correct
          @response.points=0
        end
        @response.save
        render :text=>@a+"Thank you for playing Triple Threat on Win with ET. Your answer has been recorded. You shall be informed if you were right or wrong by 8PM. Visit kyet.ptotem.com to see your score"
        return
      elsif params[:message].include?("PWD")
        @user.password = "password"
        @user.password_confirmation="password"
        @user.save
        render :text=>"Thank your for playing Win with ET. As requested, the following is your password to login on kyet.ptotem.com:"+@user.password
        return
      elsif params[:message].include?("WINET")

        @selected_option=params[:message].split(' ')[1]
        case @selected_option
          when "A" #compare to 1
            @option=@question.options[0]
          when "B" #compare to 2
            @option=@question.options[1]
          when "C"
            @option=@question.options[2]
          when "D"
            @option=@question.options[3]
          else
            render :text =>"Wrong Option Selected"
            return
        end

        @response=Response.create(:user_id => @user.id, :question_id => @question.id, :option_id => @option.id, :answer => @option.name)
        if @response.created_at<@option.question.happy_hr and @option.is_correct
          @response.points=@option.question.quiz.plus+(@option.question.quiz.plus*2)
        elsif @option.is_correct
          @response.points=@option.question.quiz.plus
        elsif @response.created_at<@option.question.happy_hr
          @response.points=0
        else
          @response.points= -(@option.question.quiz.minus)
        end
        @response.save
        render :text=>@a+"Thank You for playing Win with ET. Your answer has been recorded. You shall be informed if you were right or wrong by 8PM. Visit kyet.ptotem.com to see your score"
        return
      else
        render :text=>"Thank your for playing Win with ET. We were unable to process your previous SMS. Please check and resend with the correct keyword. Check our column for options."
        return
      end
      #end
    else
      render :text=>"Un authorized auth key"
    end
  end

  require 'spreadsheet'

  def all_question_data
    @questions=Question.all
    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet
    sheet[0, 0]="Sr No"
    sheet[0, 1]="Question Date"
    sheet[0, 2]="Question"
    sheet[0, 3]="Answer"
    sheet[0, 4]="Link"
    sheet[0, 5]="Tag"
    sheet[0, 6]="Number Attempted"
    sheet[0, 7]="Number correct"
    sheet[0, 8]="Promotion"
    sheet[0, 9]="Promotion Attempted"
    sheet[0, 10]="Promotion Won"

    @questions.each_with_index do |question, index|
      @question=question
      @index=index+1
      @question_date=@question.insertion_date
      @question_name=@question.name
      @question_answer=Option.find_by_question_id_and_is_correct(@question.id, true).name
      @link=''
      @question_tag=@question.tags.map { |i| i.name }.to_s.gsub("[", '').gsub("]", '').gsub('"', '')
      @no_attempted=Response.find_all_by_question_id(@question.id).count
      @no_correct=Response.where('question_id =? and points > ?', @question.id, 0).count
      @promotion=true
      @promotion_invoked=Response.find_all_by_question_id_and_promotion(@question.id, true).count
      @promotion_won=Response.where('question_id=? and promotion =? and points >?', @question.id, true, 0).count

      sheet[(index+1), 0]=@index
      sheet[(index+1), 1]=@question_date
      sheet[(index+1), 2]=@question_name
      sheet[(index+1), 3]=@question_answer
      sheet[(index+1), 4]=@link
      sheet[(index+1), 5]=@question_tag
      sheet[(index+1), 6]=@no_attempted
      sheet[(index+1), 7]=@no_correct
      sheet[(index+1), 8]=@promotion
      sheet[(index+1), 9]=@promotion_invoked
      sheet[(index+1), 10]=@promotion_won
    end
    book.write 'out12.xls'
    send_file 'out12.xls'
  end

  def each_question_data
    @questions=Question.find(params[:id])
    @responses=Response.find_all_by_question_id(@questions.id)
    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet
    sheet[0, 0]="Sr No"
    sheet[0, 1]="Name"
    sheet[0, 2]="PhNO"
    sheet[0, 3]="email"
    sheet[0, 4]="DOB"
    sheet[0, 5]="Location"
    sheet[0, 6]="Industry"
    sheet[0, 7]="workx"
    sheet[0, 8]="Question correct"
    sheet[0, 9]="Promotion Attempted"
    sheet[0, 10]="Promotion Won"

    @responses.each_with_index do |question, index|
      @question=question
      @user=User.find(question.user_id)
      @index=index+1
      @name=@user.name
      @phno=@user.username rescue ''
      @email=@user.email
      @dob=@user.dob
      @location=@user.location
      @industry=@user.industry
      @workx=@user.workx

      if question.points>0
        @correct=true
      else
        @correct=false
      end

      if question.promotion
        @promotion_attempted=true
        if question.points>0
          @promotion_correct=true
        else
          @promotion_correct=false
        end
      else
        @promotion_attempted=false
        @promotion_correct=false
      end

      sheet[(index+1), 0]=@index
      sheet[(index+1), 1]=@name
      sheet[(index+1), 2]=@PhNO
      sheet[(index+1), 3]=@email
      sheet[(index+1), 4]=@dob
      sheet[(index+1), 5]=@location
      sheet[(index+1), 6]=@industry
      sheet[(index+1), 7]=@workx
      sheet[(index+1), 8]=@correct
      sheet[(index+1), 9]=@promotion_attempted
      sheet[(index+1), 10]=@promotion_correct
    end
    book.write 'out12.xls'
    send_file 'out12.xls'
  end

  def each_participant_data
    @user=User.find(params[:id])
    @responses=Response.find_all_by_user_id(@user.id)
    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet
    sheet[0, 0]="Sr No"
    sheet[0, 1]="Question Date"
    sheet[0, 2]="Question"
    sheet[0, 3]="Answer"
    sheet[0, 4]="correct"
    sheet[0, 5]="Promotion"
    sheet[0, 6]="Promotion Attempted"
    sheet[0, 7]="Promotion Won"
    @responses.each_with_index do |response, index|
      @index=index+1
      @question=response.question
      @qestion_date=@question.insertion_date
      @question_name=@question.name
      @answer=Option.find_by_question_id_and_is_correct(@question.id, true).name
      #unless !response.nil?
        if response.points>0
          @correct=true
        else
          @correct=false
        end
      #end
      @promotion=true
      if response.promotion
        @promotion_attempted=true
        if response.points>0
          @promotion_correct=true
        else
          @promotion_correct=false
        end
      else
        @promotion_attempted=false
        @promotion_correct=false
      end
      sheet[(index+1), 0]=@index
      sheet[(index+1), 1]=@question_date
      sheet[(index+1), 2]=@question_name
      sheet[(index+1), 3]=@answer
      sheet[(index+1), 4]=@correct
      sheet[(index+1), 5]=@promotion
      sheet[(index+1), 6]=@promotion_attempted
      sheet[(index+1), 7]=@promotion_correct
    end
    book.write 'out12.xls'
    send_file 'out12.xls'
  end

  def all_participant_data

    book = Spreadsheet::Workbook.new
    sheet = book.create_worksheet
    sheet[0, 0]="Sr No"
    sheet[0, 1]="Name"
    sheet[0, 2]="PhNO"
    sheet[0, 3]="email"
    sheet[0, 4]="DOB"
    sheet[0, 5]="Location"
    sheet[0, 6]="Industry"
    sheet[0, 7]="workx"
    sheet[0, 8]="Current Week Score"
    sheet[0, 9]="Current Week Rank"
    sheet[0, 10]="Current Month score"
    sheet[0, 11]="Current Month Rank"
    sheet[0, 12]="Compaign Score"
    sheet[0, 13]="Compaign Rank"
    sheet[0, 14]="Question Attempted"
    sheet[0, 15]="Question Correct"
    sheet[0, 16]="Promotion Attempted"
    sheet[0, 17]="Promotion Won"

    @users=User.all
    @users.each_with_index do |user, index|
      week_score(user.id)
      month_score(user.id)
      compaign_score(user.id)
      @index=index+1
      @name=user.name
      @phno=user.username rescue ''
      @email=user.email
      @dob=user.dob
      @location=user.location
      @industry=user.industry
      @workx=user.workx
      @cws=@week_points
      @cwr=@week_rank
      @cms=@month_points
      @cmr=@month_rank
      @cs=@points
      @cr=@rank
      @qa=Response.find_all_by_user_id(user.id).count
      @qc=Response.where('user_id = ? and points > ?', user.id, 0).count
      @pa=Response.find_all_by_user_id_and_promotion(user.id, true).count
      @pw=Response.where('user_id = ? and promotion = ? and points > ?', user.id, true, 0).count
      sheet[(index+1), 0]=@index
      sheet[(index+1), 1]=@name
      sheet[(index+1), 2]=@phno
      sheet[(index+1), 3]=@email
      sheet[(index+1), 4]=@dob
      sheet[(index+1), 5]=@location
      sheet[(index+1), 6]=@industry
      sheet[(index+1), 7]=@workx
      sheet[(index+1), 8]=@cws
      sheet[(index+1), 9]=@cwr
      sheet[(index+1), 10]=@cms
      sheet[(index+1), 11]=@cmr
      sheet[(index+1), 12]=@cs
      sheet[(index+1), 13]=@cr
      sheet[(index+1), 14]=@qa
      sheet[(index+1), 15]=@qc
      sheet[(index+1), 16]=@pa
      sheet[(index+1), 17]=@pw
    end

    book.write 'out12.xls'
    send_file 'out12.xls'
  end

end
