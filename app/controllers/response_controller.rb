class ResponseController < ApplicationController
	skip_before_filter :set_var
	skip_before_filter :authenticate_user!, :only => [:res]

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
	if Date.strptime(params[:question][0], "%Y-%m-%d")!=Date.today
		@question = Question.where('insertion_date BETWEEN ? AND ?', Date.strptime(params[:question][0], "%Y-%m-%d").beginning_of_day, Date.strptime(params[:question][0], "%Y-%m-%d").end_of_day).first
      #@question=Question.find_all_by_insertion_date(Date.strptime(params[:question][0],"%Y-%m-%d")).first
      if @question.nil?
      	render :text => "Not Found"
      	return
      else
      	@option = Option.find_all_by_question_id(@question.id)
      	@correct=Option.find_by_question_id_and_is_correct(@question.id, true).id
      	render :text => "#{@question.name}|#{@option[0].id};#{@option[0].name}|#{@option[1].id};#{@option[1].name}|#{@option[2].id};#{@option[2].name}|#{@option[3].id};#{@option[3].name}|#{@correct}|#{@question.id}|#{@question.view_article}|#{@question.tag_list}|#{@question.insertion_date.strftime("%d")}|#{@question.insertion_date.strftime("%d %B %Y, %A")}"
      end
  else
  	render :text => "Not Found"
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
    @eaddresses=Array.new
    @eaddresses<< params[:email_and_location][0]
    @eaddresses<< params[:email_1_and_location_1][0]
    @eaddresses<< params[:email_2_and_location_2][0]
    @eaddresses<< params[:email_3_and_location_3][0]
    @eaddresses<< params[:email_4_and_location_4][0]

    @eaddresses.each_with_index do |eaddr,index|
      unless eaddr.split('||')[0].nil? && eaddr.split('||')[1].nil?
        @loc= eaddr.split('||')[1]
        @email=eaddr.split('||')[0]
        unless @loc.nil? && @email.nil?
          @referral=Referral.create(:user_id => current_user.id, :referred_mail => @email,:location => @loc)
        end
        if @referral.location =="Bangalore,Karnataka"
          NotificationMailer.welcome_email(@email,current_user).deliver
        end
      end
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
	require 'open-uri'
    #render :text=>params
    #return
    if params[:auth]=="5226a0cc9ee6987df1000010"
    	@a=""

    	if User.find_by_username(params[:uname]).nil?
    		passwd=Random.new.rand(10000000..99999999).to_s
    		@user=User.create(:email => "abc#{Time.now.to_i}@gmail.com", :username => params[:uname], :password => passwd, :password_confirmation => passwd);
    		str=URI::encode('http://entp.indiatimes.com/PUSHURL18/SendSms.aspx?aggregatorname=TIL&clientname=ETQUIZ&username=etquiz&password=etquiz@8888&messagetext=Thanks for playing Win with ET. Refer friends and increase your score on www.winwithet.com. Username: mobile number Password '+passwd+'. Play Daily! Win Daily!&msgtype=text&masking=ETQUIZ&delivery=true&clientuniqueid=1&dllurl=dlrurl&mobilenumber='+params[:uname])
    		@r =open(str)
    		sleep(2)
    	else
    		@user=User.find_by_username(params[:uname])
    	end
    	@question = Question.find_by_insertion_date(Date.today)

      if params[:message].include?("WINET PWD")
        passwd=Random.new.rand(10000000..99999999).to_s
        @user.password = passwd
        @user.password_confirmation=passwd
        @user.save
        render :text=>"Thank your for playing Win with ET. Following is your password to login on www.winwithet.com: "+passwd+". Play daily to win prizes!"
        return
      end



    	if params[:message].include?("WINETD")
        if @question.nil?
          render :text=>"Thanks for playing Win with ET. Entries accepted till 6pm between Mon-Fri. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
        end

        if Time.zone.now> @question.close_time
          render :text=>"Thanks for playing Win with ET. Entries close at 6pm. Please play morrow. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
        end
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
          	render :text =>"Thanks for playing Win with ET. We received a wrong keyword. Please resend. Refer friends and increase your score on www.winwithet.com . Play Daily! Win Daily!"
          	return
          end

          @response=Response.create(:user_id => @user.id, :question_id => @question.id, :option_id => @option.id, :answer => @option.name)
          if @option.is_correct
          	@response.points=@option.question.quiz.plus
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
          @response.save
          @version = Version.last
          @version.event="DD"
          @version.whodunnit=@user.id
          @version.save
          render :text=>@a+"Thanks for playing Double Delight on Win with ET. Winners will be contacted daily.Refer friends & increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
      elsif params[:message].include?("WINETT")
        if @question.nil?
          render :text=>"Thanks for playing Win with ET. Entries accepted till 6pm between Mon-Fri. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
        end

        if Time.zone.now> @question.close_time
          render :text=>"Thanks for playing Win with ET. Entries close at 6pm. Please play morrow. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
        end
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
          	render :text =>"Thanks for playing Win with ET. We received a wrong keyword. Please resend. Refer friends and increase your score on www.winwithet.com . Play Daily! Win Daily!"
          	return
          end
          @response=Response.create(:user_id => @user.id, :question_id => @question.id, :option_id => @option.id, :answer => @option.name)
          if @option.is_correct
          	@response.points=@option.question.quiz.plus
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
          @response.save
          @version = Version.last
          @version.event="TT"
          @version.whodunnit=@user.id
          @version.save
          render :text=>@a+"Thanks for playing Triple Treat on Win with ET. Winners will be contacted daily.Refer friends & increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return

      elsif params[:message].include?("WINET")
        if @question.nil?
          render :text=>"Thanks for playing Win with ET. Entries accepted till 6pm between Mon-Fri. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
        end

        if Time.zone.now> @question.close_time
          render :text=>"Thanks for playing Win with ET. Entries close at 6pm. Please play morrow. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
        end
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
          	render :text =>"Thanks for playing Win with ET. We received a wrong keyword. Please resend. Refer friends and increase your score on www.winwithet.com . Play Daily! Win Daily!"
          	return
          end

          @response=Response.create(:user_id => @user.id, :question_id => @question.id, :option_id => @option.id, :answer => @option.name)
          if !@question.happy_hr.nil?
          	if @response.created_at<@option.question.happy_hr and @option.is_correct
          		@response.points=@option.question.quiz.plus+(@option.question.quiz.plus*2)
          		@response.save
	          	@version = Version.last
	          	@version.event="hh"
	          	@version.whodunnit=@user.id
	          	@version.save
          	elsif @option.is_correct
          		@response.points=@option.question.quiz.plus
          		@response.save
	          	@version = Version.last
	          	@version.event="create"
	          	@version.whodunnit=@user.id
	          	@version.save
          	elsif @response.created_at<@option.question.happy_hr
          		@response.points=0
          		@response.save
	          	@version = Version.last
	          	@version.event="hh"
	          	@version.whodunnit=@user.id
	          	@version.save
          	else
          		@response.points= -(@option.question.quiz.minus)
          		@response.save
	          	@version = Version.last
	          	@version.event="create"
	          	@version.whodunnit=@user.id
	          	@version.save
          	end

          else
          	if @option.is_correct
          		@response.points=@option.question.quiz.plus
          	else
          		@response.points= -(@option.question.quiz.minus)
          	end
          	@response.save
          	@version = Version.last
          	@version.event="create"
          	@version.whodunnit=@user.id
          	@version.save
          end
          render :text=>@a+"Thanks for playing Win with ET. Winners will be contacted daily. Refer friends and increase your score on www.winwithet.com. Play Daily! Win Daily!"
          return
      else
      	render :text=>"Thanks for playing Win with ET. We received a wrong keyword. Please resend. Refer friends and increase your score on www.winwithet.com . Play Daily! Win Daily!"
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


def tag_list
	@tag=Tag.find_by_name(params[:tag][0])

	@returning_data=Array.new
	if !@tag.nil?
		@articles=Question.tagged_with(@tag.name)
		@articles.each do |a|
			Option.find_all_by_question_id(a.id).each do |o|
				@option=o.name
			end
			@returning_data<<"#{a.id}|#{a.insertion_date}|#{a.name}|#{@option}|#{a.view_article}"
		end
		render :text => @returning_data
		return

	else
		render :text => "Nothing"
		return
	end
end


require 'open-uri'
def send_response
	@responses=Response.find_all_by_question_id(Question.find_by_insertion_date(Date.today)).map{|i| i.user_id}.uniq
    #render :text=>@responses
    #return
    @r=Array.new
    @responses.each_with_index do |u|
    	@valid_responses=Response.find_all_by_question_id_and_user_id(Question.find_by_insertion_date(Date.today),u).last
    	if @valid_responses.points>0
    		str=URI::encode('http://entp.indiatimes.com/PUSHURL18/SendSms.aspx?aggregatorname=TIL&clientname=ETQUIZ&username=etquiz&password=etquiz@8888&messagetext=Congratulations, your answer today was correct. Check your score and rank on kyet.ptotem.com. Come back tomorrow to win daily and weekly prizes.&msgtype=text&masking=ETQUIZ&delivery=true&clientuniqueid=1&dllurl=dlrurl&mobilenumber='+User.find(u).username)
    		@r << open(str)
    		if !User.find(u).nil?
    			@user=User.find(u)
    			@user.refer_points=@user.refer_points+@valid_responses.points
    			@user.save
    			@version=Version.last
    			@version.event="correct"
    			@version.whodunnit=u
    			@version.save
          #@r<<@user.refer_points
      end

  else  
  	str=URI::encode('http://entp.indiatimes.com/PUSHURL18/SendSms.aspx?aggregatorname=TIL&clientname=ETQUIZ&username=etquiz&password=etquiz@8888&messagetext=Sorry, your answer today was incorrect. Play again tomorrow to win daily and weekly prizes. Refer a friend to maximise your scores for the grand prize.&msgtype=text&masking=ETQUIZ&delivery=true&clientuniqueid=1&dllurl=dlrurl&mobilenumber='+User.find(u).username)
  	@r << open(str)
  	if !User.find(u).nil?
  		@user=User.find(u)
  		@user.refer_points=@user.refer_points+@valid_responses.points
  		@user.save
  		@version=Version.last
  		@version.event="incorrect"
  		@version.whodunnit=u
  		@version.save
          #@r<<@user.refer_points
      end
  end
end
render :text=>@r
return  
end  

def question_details
	@quest_name=Question.find(params[:date_id])
	render :text =>"#{@quest_name.name}||#{Option.find_all_by_question_id(@quest_name.id).map{|o| o.name }.join("&&")}||#{Option.find_all_by_question_id(@quest_name.id).map{|o| o.id}.join("&&")}||#{Option.find_all_by_question_id(@quest_name.id).map{|o| o.is_correct}.join("&&")}||#{@quest_name.view_article}||#{@quest_name.id}"
end


end
