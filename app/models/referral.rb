class Referral < ActiveRecord::Base
  attr_accessible :referred_mail, :user_id, :location
  belongs_to :user
end
