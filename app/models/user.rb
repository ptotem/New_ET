class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  attr_accessible :email, :password, :password_confirmation, :remember_me,:admin, :role, :provider, :uid, :profile,:age, :workx, :name, :location, :industry, :username,:score,:refer_points, :display_modal, :state, :city, :user_fb_access_token,:nickname,:user_photo,:picture, :dob, :successful_reference,:user_picture
  attr_accessor :avatar

  has_attached_file :user_photo
  # attr_accessible :title, :body

  has_many :authentications, :dependent => :destroy
  has_many :responses, :dependent => :destroy
  has_many :referrals, :dependent => :destroy
  has_one :profile, :dependent => :destroy
  has_many :feedbacks
  has_attached_file :user_picture


  has_paper_trail
  after_create  :check_country_code_in_username

  def superadmin?
    role=="Superadmin"
  end

  def admin?
    role=="Admin"
  end

  def self.create_guest_user
    key="#{Time.now.to_i}#{rand(99)}"
    u = User.create(:email => "guest_#{key}@ptemplar.com", :name=>"guest_#{key}")
    u.save(:validate => false)
    u
  end



  def refer_email
    @user=User.find_by_email(self.email)
    if !Referral.find_by_referred_mail(@user.email).nil?
      @refer=Referral.find_by_referred_mail(@user.email).user_id
      @user_id=User.find(@refer)
      @refer_points=@user_id.refer_points
      @user_id.update_attributes(:refer_points=>@refer_points+5)
      @user_id.save
    end

  end

  def check_country_code_in_username
    @user = User.find(self.id)
    @username = @user.username
    @first_two_char = @username[0..1]

    if @first_two_char != "91"
      @user.username = "91#{@username}"
      @user.save!
   end
  end

  def self.score_update
    @user=User.find(1)
    @user.refer_points=@user.refer_points+5
    @user.save
    puts "Score Updated"
  end 

  
  def self.send_response

    require 'open-uri'
    if !Question.find_by_insertion_date(Date.today).nil?
      @responses=Response.find_all_by_question_id(Question.find_by_insertion_date(Date.today)).map{|i| i.user_id}.uniq
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
          end
        end


    end
  else
    puts "There is no Question today"
  end 
end  

end
