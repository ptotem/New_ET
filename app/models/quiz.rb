class Quiz < ActiveRecord::Base
  attr_accessible :is_survey, :minus, :name, :plus
  has_many :questions, :dependent => :destroy
  has_and_belongs_to_many :bonus
end
