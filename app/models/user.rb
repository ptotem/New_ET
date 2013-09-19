class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  attr_accessible :email, :password, :password_confirmation, :remember_me,:admin, :role, :provider, :uid, :profile,:age, :workx, :name, :location, :industry, :username,:score,:refer_points, :display_modal, :state, :city, :user_fb_access_token
  # attr_accessible :title, :body

  has_many :authentications, :dependent => :destroy
  has_many :responses, :dependent => :destroy
  has_many :referrals, :dependent => :destroy
  has_one :profile, :dependent => :destroy
  has_many :feedbacks
  has_paper_trail
  after_create :refer_email

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

  #def create_profile
  #  Profile.create!(:user_id=>self.id,:location=>nil,:industry=>nil,:age=>nil,:workx=>nil)
  #end

  def refer_email
    @user=User.find_by_email(self.email)
    if !Referral.find_by_referred_mail(@user.email).nil?
      @refer=Referral.find_by_referred_mail(@user.email).user_id
      @user_id=User.find(@refer)
      @refer_points=@user_id.refer_points
      @user_id.update_attributes(:refer_points=>@refer_points+20)
      @user_id.save
   end
  end
end
