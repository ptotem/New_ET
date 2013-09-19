class QuizController < ApplicationController
  #before_filter :authenticate_user!, :only => [:profile]
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
      @leaderboard<<{:user_id=>u.id,:score=>@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum}

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
    #@yesterday_question =Question.find_all_by_insertion_date(Date.yesterday).first
    @yesterday_question=Question.all.sort_by(&:insertion_date)
    @yesterday_question=@yesterday_question[@yesterday_question.count-2]
    @question = @yesterday_question.name
    @option = Option.find_all_by_question_id(@yesterday_question.id)
    @correct=Option.find_by_question_id_and_is_correct(@yesterday_question.id, true).id
    @month_list=(Question.order('insertion_date DESC').last.insertion_date..Question.order('insertion_date DESC').first.insertion_date).map { |d| [d.year, d.month] }.uniq
    @questions=Array.new
    @month_list.each_with_index do |i, index|
      @questions<<Question.show_sales_for_current_month(i[0].to_i, i[1])
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
    @users=Array.new
    @week_leaderboard=Array.new
    @week_questions=Question.show_for_current_week
    @week_questions.all.each do |q|
      @users<<Response.find_all_by_question_id(q.id).map{|i| i.user_id}
    end
    @users=@users.flatten.uniq
    @users.each do |u|
      @user_res=Array.new
       @week_questions.all.each do |q|
        @user_res<<Response.find_all_by_question_id_and_user_id(q.id,u).last
      end
      @user_res=@user_res.delete_if{|x| x==nil}
      @week_leaderboard<<{:user_id=>u,:score=>@user_res.map{|i| i.points}.sum}
    end  

    @month_users=Array.new
    @month_leaderboard=Array.new
    @month_questions=Question.show_sales_for_current_month(Date.today.year, Date.today.month)
    @month_questions.all.each do |q|
      @month_users<<Response.find_all_by_question_id(q.id).map{|i| i.user_id}
    end
    @month_users=@month_users.flatten.uniq
    @month_users.each do |u|
      @user_res=Array.new
       @month_questions.all.each do |q|
        @user_res<<Response.find_all_by_question_id_and_user_id(q.id,u).last
      end
      @user_res=@user_res.delete_if{|x| x==nil}
      @month_leaderboard<<{:user_id=>u,:score=>@user_res.map{|i| i.points}.sum}
    end
  end

  def profile
    @user=User.find(current_user.id)
    #render :layout => false
  end

  def change_profile
    @profile=User.find(current_user.id)
    @profile.name=params[:name]
    @profile.age=params[:age]
    @profile.workx=params[:workx]
    @profile.location=params[:location]
    @profile.industry=params[:industry]
    @profile.save
    if params[:from_page]=="index"
      redirect_to "/"
      #@profile.display_modal=true
    else
      redirect_to "/profile"
    end
  end

  def recent_activity
    @recent_activity=Array.new
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
    render :text => @recent_activity.reverse![0..2]
  end

  def get_score
    @score=Array.new
    @leaderboard=Array.new
    User.all.each do |u|
      @questions=Array.new
      Question.all.each do |q|
        @questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
      end
      @questions=@questions.uniq.flatten!
      @score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      @leaderboard<<{:user_id=>u.id,:score=>@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum}

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
    render :text=>"#{@points}|#{@rank}|#{@answer_correct_rate}"   
  end  

  def current_status
    render :text => "#{@user_score.count}|#{@answer_rate*100/@user_score.count}"
    return
  end



 end
