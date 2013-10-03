class Profile < ActiveRecord::Base
  attr_accessible :age, :industry, :workx, :name,:dob
  belongs_to :user
end
