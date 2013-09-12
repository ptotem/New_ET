class Bonus < ActiveRecord::Base
  attr_accessible :end_time, :minus, :multiplier, :name, :plus, :start_time, :wagerable
  just_define_time_picker :end_time, :add_to_attr_accessible => true
  just_define_time_picker :start_time, :add_to_attr_accessible => true
  has_and_belongs_to_many :questions
  has_and_belongs_to_many :quizzes
end
