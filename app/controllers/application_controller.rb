class ApplicationController < ActionController::Base
  protect_from_forgery
  #before_filter :authenticate_user!
  #before_filter :set_var
#  include ActionController::MimeResponds
#  include ActionController::ImplicitRender
  
  #def after_sign_in_path_for(resource)
   # "/"
  #end

  def week_score(user_id)
    @current_user=User.find(user_id)
    @week_questions=Question.show_for_current_week
    @week_score=Array.new
    @week_leaderboard=Array.new
    User.all.each do |u|
      @questions=Array.new
      @week_questions.all.each do |q|
        @questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
      end
      @questions=@questions.uniq.flatten!
      @week_score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      @week_leaderboard<<{:user_id=>u.id,:score=>@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum}
      if (u==@current_user)
        @week_points=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
        @user_score=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }
      end
    end
    @week_rank= @week_score.sort().reverse.index(@week_points)+1 rescue ''
  end

  def month_score(user_id)
    @current_user=User.find(user_id)
    @month_questions=Question.show_sales_for_current_month(Date.today.year, Date.today.month)
    @month_score=Array.new
    @month_leaderboard=Array.new

    User.all.each do |u|
      @questions=Array.new
      @month_questions.all.each do |q|
        @questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
      end
      @questions=@questions.uniq.flatten!
      @month_score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      @month_leaderboard<<{:user_id=>u.id,:score=>@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum}
      if (u==@current_user)
        @month_points=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
        @user_score=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }
      end
    end
    @month_rank= @month_score.sort().reverse.index(@month_points)+1 rescue ''
  end

  def facebook_cookies
    @facebook_cookies ||= Koala::Facebook::OAuth.new('648492791862773', 'a9efe5c308bc11d1058432d9b7313d91').get_user_info_from_cookie(cookies)
  end


end
