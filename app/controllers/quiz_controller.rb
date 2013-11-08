class QuizController < ApplicationController
  before_filter :authenticate_user!, :only => [:profile,:dis_value_change]
  #before_filter :set_var
  #before_filter :set_var,:only =>[:profile]



  #private
  def set_var
    @score=Array.new
    @leaderboard=Array.new
    User.all.each do |u|
      @questions=Array.new
      Question.all.each do |q|
        @questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
      end
      @questions=@questions.uniq.flatten!
      @score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      @leaderboard<<{:user_id => u.id, :score => @questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum}

      if (u==current_user)
        @points=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
        @user_score=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }
        @answer_rate=0
        @user_score.each do |s|
          if s>0
            @answer_rate=@answer_rate+1
          end
        end
        unless @user_score.count==0
          @answer_correct_rate=(@answer_rate*100/@user_score.count)
        end
      end
    end
    @rank= @score.sort().reverse.index(@points)+1 rescue ''
    @recent_activity=Array.new
    unless !user_signed_in?
      Version.find_all_by_whodunnit(current_user.id).each do |ver|
        case ver.item_type
          when "User"
            @recent_activity<<"User updated his profile"
          when "Response"
            case ver.event
              when "create"
                @response=Response.find(ver.item_id)
                @recent_activity<<"User answer question dated "+@response.question.insertion_date.to_s
              when "update"
                @response=Response.find(ver.item_id)
                @recent_activity<<"User applied for bonus for question dated "+@response.question.insertion_date.to_s
            end
        end
      end
    end
    @recent_activity=@recent_activity.reverse!
  end

  def index
    @current_date = DateTime.now.to_date.strftime('%d %B %Y')
    @question = Question.find_by_insertion_date(Date.today)
    if !@question.nil?
      @question_name = @question.name
      @question_id = @question.id
      @user_id = current_user
      @option = Option.find_all_by_question_id(@question.id)
    end
  end

  def archives_index
    @date = DateTime.now.to_date-1
    @previous_date = @date.strftime('%d %B %Y')
    @yesterday_question =Question.find_all_by_insertion_date((Time.zone.now-1.day).to_date).first
    # render :text =>@yesterday_question
    # return
    #@yesterday_question=Question.all.sort_by(&:insertion_date)
    if !@yesterday_question.blank?
    #@yesterday_question=@yesterday_question[@yesterday_question.count-1]
    @question = @yesterday_question.name
    @date=@yesterday_question.insertion_date
    @option = Option.find_all_by_question_id(@yesterday_question.id)
    @correct=Option.find_by_question_id_and_is_correct(@yesterday_question.id, true).id
    @month_list=(Question.order('insertion_date DESC').last.insertion_date..Question.order('insertion_date DESC').first.insertion_date).map { |d| [d.year, d.month] }.uniq
    @questions=Array.new
    @month_list.each_with_index do |i, index|
      @questions<<Question.show_sales_for_current_month(i[0].to_i, i[1])
    end
    end
    #render :layout => false
  end


  def archives
    if params[:tag]
      @articles = Question.tagged_with(params[:tag])
    else
      @articles = Question.all
    end
  end


  def leaderboard
    @usrs=Array.new
    @week_leaderboard=Array.new
    @week_questions=Question.show_for_current_week - Question.find_all_by_insertion_date((Time.zone.now).to_date)
    @week_questions.each do |q|
      @usrs<<Response.find_all_by_question_id(q.id).map { |i| i.user_id }
    end
    @usrs=@usrs.flatten.uniq
    @usrs.each do |u|
      @user_res=Array.new
      @week_questions.each do |q|
        @user_res<<Response.find_all_by_question_id_and_user_id(q.id, u).last
      end
      @user_res=@user_res.delete_if { |x| x==nil }
      @week_leaderboard<<{:user_id => u, :score => @user_res.map { |i| i.points rescue 0 }.delete_if{|x| x==nil}.sum}
    end

    #@week_leaderboard= []

    @month_users=Array.new
    @month_leaderboard=Array.new
    @month_questions=Question.all - Question.find_all_by_insertion_date((Time.zone.now).to_date)
    @month_questions.each do |q|
      @month_users<<Response.find_all_by_question_id(q.id).map { |i| i.user_id }
    end
    @month_users=@month_users.flatten.uniq
    @month_users.each do |u|
      @user_res=Array.new
      @month_questions.each do |q|
        @user_res<<Response.find_all_by_question_id_and_user_id(q.id, u).last
      end
      @user_res=@user_res.delete_if { |x| x==nil }
      @month_leaderboard<<{:user_id => u, :score => @user_res.map { |i| i.points }.delete_if{|x| x==nil}.sum}
    end
    #
    #@month_leaderboard=[]
    #
    @daily_users=Array.new
    @daily_leaderboard=Array.new
    if !Question.find_by_insertion_date(Date.today).nil?
    @daily_questions=Question.find_by_insertion_date(Date.today)
    @daily_users=Response.find_all_by_question_id(@daily_questions.id).map { |i| i.user_id }
    @daily_users=@daily_users.flatten.uniq
    @daily_users.each do |d|
      @user_res=Array.new
      @user_res<<Response.find_all_by_question_id_and_user_id_and_is_correct(@daily_questions.id, d, true).last
      @user_res=@user_res.delete_if { |x| x==nil }
      @daily_leaderboard<<{:user_id => d, :score => @user_res.map { |i| i.points }.sum}
    end
      render :layout => "application"
    end
  end

  def calculate_correct_score_for_all_user
    User.all.each do |uu|
      uu.refer_points=0
      uu.save
    end
    @users=Array.new
    @questions=Question.all
    @questions.each do |q|
      @users<<Response.find_all_by_question_id(q.id).map { |i| i.user_id }
    end
    @users=@users.flatten.uniq
    @users.each do |u|
      begin
        @user=User.find(u)
      rescue ActiveRecord::RecordNotFound => e
        @user=nil
      end
     #   @user=User.find(u)
      if !@user.nil?

      @user_res=Array.new
      @questions.each do |q|
        @user_res<<Response.find_all_by_question_id_and_user_id(q.id, u).last
        @user.refer_points=@user.refer_points+(Response.find_all_by_question_id_and_user_id(q.id, u).last.points rescue 0)
        @user.save
      end
     end
    end
    render :text => "All the score updated successfully....."
    return
  end




  def profile
    @user=User.find(current_user.id)
    @user_fb_sign_in_count = @user.fb_sign_in_count rescue 0

  end

  def upload_photo
    @curr_user=User.find(current_user.id)
    @curr_user.user_pic=params[:user][:user_pic]
    @curr_user.save
    redirect_to "/profile"
  end


  def change_profile
    @profile=User.find(current_user.id)
    @profile.name=params[:name]
    #render :text => @profile.name
    #return
    @profile.email=params[:email]
    @dob_day = params["user"]["dob(3i)"]
    @dob_month = params["user"]["dob(2i)"]
    @dob_year = params["user"]["dob(1i)"]
    @user_age = Time.now.year.to_i - params["user"]["dob(1i)"].to_i
    @profile.dob=Date.strptime(params["user"]["dob(3i)"]+"/"+params["user"]["dob(2i)"]+"/"+params["user"]["dob(1i)"],"%d/%m/%Y")
    @profile.age=@user_age
    @profile.workx=params[:workx]
    @profile.location=params[:location]
    @profile.industry=params[:industry]
    @profile.password=params[:password]
    @profile.save
    @version=Version.last
    @version.event="profile_update"
    @version.whodunnit=current_user.id
    @version.save
    sign_in(@profile, :bypass => true)
    if params[:from_page]=="index"
      redirect_to "/"
    else
      redirect_to "/profile"
    end
  end

  def admin_change_profile

    @profile=User.find(params[:uid].to_i)

    @profile.name=params[:name]
    @profile.age=params[:age]
    @profile.workx=params[:workx]
    @profile.location=params[:location]
    @profile.industry=params[:industry]
    @profile.password=params[:password]
    @profile.save
    @version=Version.last
    @version.event="profile_update"
    @version.whodunnit=1
    @version.save
    sign_in(@profile, :bypass => true)
    redirect_to "/daily_winner"
  end

  def recent_activity
    @recent_activity=Array.new
    #Version.find_all_by_item_id_and_item_type(current_user.id, "User").each do |ver|
    Version.find_all_by_whodunnit(current_user.id).each do |ver|
      case ver.item_type
        when "User"
          case ver.event
            when "profile_update"
              @recent_activity<<"Profile last updated on #{ver.created_at.strftime("%d %B %Y")}"
            #when "correct"
            #  @recent_activity<<"User has answered correctly"
            #when "incorrect"
            #  @recent_activity<<"User has answered incorrectly"
          end

        when "Response"
          case ver.event
            when "create"
              @response=Response.find(ver.item_id)
              @recent_activity<<"Last played on #{@response.question.insertion_date.strftime("%d %B %Y")}"
            when "DD"
              @response=Response.find(ver.item_id)
              @recent_activity<<"Double Delight promotion used on #{@response.question.insertion_date.strftime("%d %B %Y")}"
            when "TT"
              @response=Response.find(ver.item_id)
              @recent_activity<<"Triple Treat promotion used on #{@response.question.insertion_date.strftime("%d %B %Y")}"
            when "hh"
              @response=Response.find(ver.item_id)
              @recent_activity<<"Happy Hours promotion used on #{@response.question.insertion_date.strftime("%d %B %Y")}"
          end
      end
    end
    render :text => @recent_activity.reverse![0..2]
  end

  def get_score
    @score=Array.new
    @leaderboard=Array.new
    User.all.each do |u|
      @questions=Array.new
      Question.all.each do |q|
        #@questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
        @questions<<((Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))-Response.find_all_by_question_id(Question.find_by_insertion_date(Date.today)))
      end
      @questions=@questions.uniq.flatten!
      @score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      @leaderboard<<{:user_id => u.id, :score => @questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum}

      if (u==current_user)
        @points=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
        @user_score=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }
        @answer_rate=0
        @user_score.each do |s|
          if s>0
            @answer_rate=@answer_rate+1
          end
        end
        unless @user_score.count==0
          @answer_correct_rate=(@answer_rate*100/@user_score.count)
        end
      end
    end
    @rank= @score.sort().reverse.index(@points)+1 rescue ''
    render :text => "#{@points}|#{@rank}|#{@answer_correct_rate}"
  end

  def current_status
    render :text => "#{@user_score.count}|#{@answer_rate*100/@user_score.count}"
    return
  end

  def decide_daily_winner
    if !Question.find_by_insertion_date(Date.today).nil?
    @question=Question.find_by_insertion_date(Date.today)
    
    @daily_winners=Response.where('question_id =? and points > ?', @question.id, 0).map{|i| i.user_id}.uniq
    
    @daily_winners.shuffle[0..9].each do |dw|
      DailyWinner.create(:question_id=>@question.id,:user_id=>dw,:is_display=>false)
    end
    end
    render :text=>@daily_winners
    return
  end

  def daily_winner
    if admin_user_signed_in?

      if !Question.find_by_insertion_date(Date.today).nil?
        @question=Question.find_by_insertion_date(Date.today)
        @daily_wins=DailyWinner.where(:question_id => @question.id)
        #@dawin=User.all.map{ |i| i.id} - DailyWinner.all.map{|i| i.user_id}
      end
    else
      render :text=>"You are not authorized to see this page."
    end
  end

  def dis_value_change
    @daily_display=DailyWinner.find_by_user_id(params[:dis_val][0])
    @daily_display.is_display=true
    @daily_display.save
    render :text => @daily_display.is_display
    return
  end


    def all_recent_activities
      @recent_activity=Array.new
      #Version.find_all_by_item_id_and_item_type(current_user.id, "User").each do |ver|
      Version.find_all_by_whodunnit(current_user.id).each do |ver|
        case ver.item_type
          when "User"
            case ver.event
              when "profile_update"
                @recent_activity<<"Profile last updated on #{ver.created_at.strftime("%d %B %Y")}"
              #when "correct"
              #  @recent_activity<<"User has answered correctly"
              #when "incorrect"
              #  @recent_activity<<"User has answered incorrectly"
            end

          when "Response"
            case ver.event
              when "create"
                @response=Response.find(ver.item_id)
                @recent_activity<<"Last played on #{@response.question.insertion_date.strftime("%d %B %Y")}"
              when "DD"
                @response=Response.find(ver.item_id)
                @recent_activity<<"Double Delight promotion used on #{@response.question.insertion_date.strftime("%d %B %Y")}"
              when "TT"
                @response=Response.find(ver.item_id)
                @recent_activity<<"Triple Treat promotion used on #{@response.question.insertion_date.strftime("%d %B %Y")}"
              when "hh"
                @response=Response.find(ver.item_id)
                @recent_activity<<"Happy Hours promotion used on #{@response.question.insertion_date.strftime("%d %B %Y")}"
            end
        end
      end
      render :text => @recent_activity.reverse!
    end





  def quiz_change_password
  @profile=User.find(current_user.id)
  @profile.password=params[:password]
  @profile.save
  @version=Version.last
  @version.event="profile_update"
  @version.whodunnit=current_user.id
  @version.save
  sign_in(@profile, :bypass => true)
  if params[:from_page]=="index"
    redirect_to "/"
  else
    redirect_to "/profile"
  end
end


 def about_quiz

 end





end
