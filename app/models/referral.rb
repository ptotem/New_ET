class Referral < ActiveRecord::Base
  attr_accessible :referred_mail, :user_id
  belongs_to :user
end
