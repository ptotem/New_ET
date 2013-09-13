class WelcomeController < ApplicationController
  before_filter :set_var,:only =>[:index]

  #private
  def set_var
    @score=Array.new
    User.all.each do |u|
      @questions=Array.new
      Question.all.each do |q|
        @questions<<(Response.find_all_by_question_id(q.id) & Response.find_all_by_user_id(u.id))
      end
      @questions=@questions.uniq.flatten!
      @score<<@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
      if (u==current_user)
        @points=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }.sum
        @user_score=@questions.map { |i| (i.points) }.delete_if { |x| x == nil }
        @answer_rate=0
        @user_score.each do |s|
          if s>0
            @answer_rate=@answer_rate+1
          end
        end
        @answer_correct_rate=(@answer_rate*100/@user_score.count)
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
    #render :layout => false
  end

  def create_guest_user
    u = User.create_guest_user
    sign_in(:user, u)
    redirect_to "/"
  end



  def facebook
    auth=request.env["omniauth.auth"]
    if auth.provider=='facebook' # Checking if request comes from facebook or twitter
      if User.find_by_uid(auth['uid']).nil?
        users_email = auth.extra.raw_info.email
        if users_email.nil?
          @user = User.create(:provider => auth["provider"], :uid => auth["uid"], :name => auth["info"]["name"])
        else
          @user = User.create(:provider => auth["provider"], :email => users_email, :password => Devise.friendly_token[0, 20], :uid => auth["uid"], :name => auth["info"]["name"])
        end
      else
        @user=User.find_by_email(auth.info.email)
        @user=User.find_by_uid(auth['uid'])
      end
    else
      if User.find_by_uid(auth['uid']).nil?
        @user=User.create!(:provider => auth['provider'], :uid => auth['uid'], :name => auth['info']['name'])
      else
        @user=User.find_by_uid(auth['uid'])
      end
    end


    sign_in(:user, @user)
    @user.save
    redirect_to "/"
  end

  def my_new_user
    #@user=User.create!(:email => params[:user][:email],:name => params[:name],:age => params[:age],:workx => params[:workx],:location => params[:location],:industry => params[:industry],:username => params[:user][:username],:password => params[:user][:password])
    #@user.save
    #redirect_to "/"
  end

end
