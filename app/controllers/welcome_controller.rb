class WelcomeController < ApplicationController
  #before_filter :set_var,:only =>[:i]
  #before_filter :parse_facebook_cookies

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
    if user_signed_in?
      @usr = User.find(current_user.id)
      @dm = @usr.display_modal
      @usr_at = @usr.user_fb_access_token
    end
  end

  def control_edit_profile_modal
    @usr = User.find(current_user.id)
    @usr.display_modal = true
    @usr.save
    render :text => "display_modal set to false"
    return
  end

  def create_guest_user
    u = User.create_guest_user
    sign_in(:user, u)
    redirect_to "/"
  end



  def facebook
    if user_signed_in?
      #render :text => request.env["omniauth.auth"].info.image.to_s
      #render :text => request.env["omniauth.auth"]["provider"]
      #return
      @user = current_user
      @user_first_name=request.env["omniauth.auth"].extra.raw_info.first_name
      @user_last_name=request.env["omniauth.auth"].extra.raw_info.last_name
      @user.name = "#{@user_first_name} #{@user_last_name}"
      @user.location = request.env["omniauth.auth"]["extra"]["raw_info"]["location"]["name"]
      @user.uid = request.env["omniauth.auth"]["uid"]
      @user.user_fb_access_token = request.env["omniauth.auth"].credentials.token
      @user.picture = request.env["omniauth.auth"].info.image

      if (!@user.fb_signed_in)
        #if request.env["omniauth.auth"]["provider"]=="facebook"
        @user.provider = request.env["omniauth.auth"]["provider"]
        @user.fb_sign_in_count = @user.fb_sign_in_count+1
        @user.fb_signed_in=true
        @user.fb_sign_in_score = 20
        #render :text => "provider :- #{@user.provider}, fb_sign_in_count :- #{@user.fb_sign_in_count}, fb_sign_in_score :- #{@user.fb_sign_in_score}"
        #return
        #end
      end

      @user.save!

      redirect_to "/profile" and return
    else
      #render :text => "else part"
      #return
      auth=request.env["omniauth.auth"]

      if auth.provider=='facebook' # Checking if request comes from facebook or twitter
        if User.find_by_uid(auth['uid']).nil?
          users_email = auth.extra.raw_info.email
          if users_email.nil?
            @user = User.create(:provider => auth["provider"], :uid => auth["uid"], :name => auth["info"]["name"])
          else
            @user = User.create(:provider => auth["provider"], :email => users_email, :password => Devise.friendly_token[0, 20], :uid => auth["uid"], :name => auth["info"]["name"] ,:picture => auth.info.image)
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
      @user.uid = request.env["omniauth.auth"]["uid"]
      @user.user_fb_access_token = request.env["omniauth.auth"].credentials.token
      @user.user_photo = request.env["omniauth.auth"].info.image
      @user.save
      redirect_to "/profile" and return
    end
  end

  def update_fb_sign_in_score
    @user = User.find(current_user.id)
    @user.fb_sign_in_score = 20
    @user.save!
    render :text => @user.fb_sign_in_score
  end

  def mobile_no_checking
    @mobile_no=User.find_by_username(params[:username][0])
    if !@mobile_no.nil?
      render :text => @mobile_no.name
      return
    else
      render :text => "Nothing"
      return
    end
  end


  def change_password
    require 'open-uri'
    passwd=Random.new.rand(10000000..99999999).to_s
    @user=User.find_by_username(params[:mobile_no][0])
    @user.password = passwd
    @user.password_confirmation=passwd
    @user.save
    str=URI::encode('http://entp.indiatimes.com/PUSHURL18/SendSms.aspx?aggregatorname=TIL&clientname=ETQUIZ&username=etquiz&password=etquiz@8888&messagetext=Welcome to Win with ET. Thank you for playing. Join us on www.winwithet.com using the following password to login: '+passwd+'. Play daily to win exciting daily and weekly prizes and one month-end Grand Prize.&msgtype=text&masking=ETQUIZ&delivery=true&clientuniqueid=1&dllurl=dlrurl&mobilenumber='+@user.username)
    @r =open(str)

    render :text=>"Thank your for playing Win with ET. Following is your password to login on www.winwithet.com: "+passwd+". Play daily to win prizes!"
    return

  end


  def my_new_user
    @dob_day = params[:users]["dob(3i)"]
    @dob_month = params[:users]["dob(2i)"]
    @dob_year = params[:users]["dob(1i)"]
    @user_age = Time.now.year.to_i - params[:users]["dob(1i)"].to_i
    @user=User.create!(:email => params[:users][:email],:username => params[:users][:username],:name => params[:users][:name],:dob => "#{@dob_day}-#{@dob_month}-#{@dob_year}", :age=>@user_age, :workx => params[:users][:workx],:location => params[:register_location],:industry => params[:users][:industry],:password => "password")
    @user.save
    if !params[:refere_id].nil?
      @ruser=User.find(params[:refere_id].to_i)
      @ruser.successful_reference=@ruser.successful_reference+1
      @ruser.refer_points=@ruser.refer_points+5
      @ruser.save
    end
    sign_in(:user, @user)
    redirect_to "/"
  end




  #def parse_facebook_cookies
  #  @facebook_cookies ||= Koala::Facebook::OAuth.new('648492791862773', 'a9efe5c308bc11d1058432d9b7313d91').get_user_info_from_cookie(cookies)
    #render :text => @facebook_cookies
    #return
  #end

  def get_connections
    #render :text => params[:access_token]
    #return
    @graph = Koala::Facebook::GraphAPI.new
    #@graph = Koala::Facebook::API.new('CAACEdEose0cBACCmCBvyj23A3fTMcyaz5XZAYP1ZBDzZAez3MyPfvMicalGapwZAae5JwyostSKkafZBmZBa296s1LdZBKVvgbzMayzxTZAlvpUaJF5aeg38DnvwjZC8xQtSBeGEiQDkz52aiFzrTQ715chDnV25lVrJNh7IlrGq7HSNAZAbXKyFFMXh8mUu40lNoZD')
    @graph = Koala::Facebook::API.new(params[:access_token])

    #@access_token = facebook_cookies['access_token']
    #@graph = Koala::Facebook::GraphAPI.new(@access_token)

    #@graph = Koala::Facebook::API.new(params[:access_token])

    profile = @graph.get_object("me")
    @friends = @graph.get_connections("me", "friends")
    #render :json => @friends
    #return
  end

  def send_message_to_frnd
    #render :text => current_user.user_fb_access_token
    #return

    require 'xmpp4r'
    require 'xmpp4r_facebook'

    #sender_chat_id = "-100001404670711@chat.facebook.com"
    sender_chat_id = "-#{current_user.uid}@chat.facebook.com"
    receiver_chat_id = "-#{params[:frnd_id]}@chat.facebook.com"
    message_body = "Hi, this message is from et app"
    message_subject = "et messgae"

    jabber_message = Jabber::Message.new(receiver_chat_id, message_body)
    jabber_message.subject = message_subject

    client = Jabber::Client.new(Jabber::JID.new(sender_chat_id))
    client.connect
    client.auth_sasl(Jabber::SASL::XFacebookPlatform.new(client,
                                                         '648492791862773',"#{current_user.user_fb_access_token}",
                                                         'a9efe5c308bc11d1058432d9b7313d91'), nil)
    client.send(jabber_message)
    client.close


  end

end
