class DailyWinner < ActiveRecord::Base
  attr_accessible :is_display, :question_id, :user_id

  belongs_to :question
end
