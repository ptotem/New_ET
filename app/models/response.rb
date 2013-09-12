class Response < ActiveRecord::Base
  attr_accessible :answer, :is_correct, :option_id, :points, :question_id, :user_id, :promotion
  has_paper_trail
  belongs_to :question
  belongs_to :option
  belongs_to :user
end
