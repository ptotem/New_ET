class DailyWinner < ActiveRecord::Base
  attr_accessible :is_display, :question_id, :user_id, :today_winners

  belongs_to :question
end
