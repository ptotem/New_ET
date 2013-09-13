class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  attr_accessible :email, :password, :password_confirmation, :remember_me,:admin, :role, :provider, :uid, :profile,:age, :workx, :name, :location, :industry, :username
  # attr_accessible :title, :body

  has_many :authentications, :dependent => :destroy
  has_many :responses, :dependent => :destroy
  has_many :referrals, :dependent => :destroy
  has_one :profile, :dependent => :destroy
  has_many :feedbacks
  has_paper_trail
  #after_create :create_profile

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

end
