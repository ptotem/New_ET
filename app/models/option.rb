class Option < ActiveRecord::Base
  attr_accessible :is_correct, :name, :question_id
  belongs_to :question
  has_many :responses, :dependent => :destroy
end
