class Profile < ActiveRecord::Base
  attr_accessible :age, :industry, :workx, :name
  belongs_to :user
end
