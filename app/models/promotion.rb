class Promotion < ActiveRecord::Base
  attr_accessible :multiplier, :name,:questions,:questions_attributes

  has_and_belongs_to_many :questions
end
