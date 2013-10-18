class Response < ActiveRecord::Base
  attr_accessible :answer, :is_correct, :option_id, :points, :question_id, :user_id, :promotion
  has_paper_trail
  belongs_to :question
  belongs_to :option
  belongs_to :user

  def self.decide_daily_winner
    #DailyWinner.destroy_all
    @question=Question.find_by_insertion_date(Date.today)
    @daily_winners=Response.find_all_by_question_id(@question.id).map{|i| i.user_id}.uniq
    @daily_winners.shuffle[0..9].each do |dw|
      DailyWinner.create(:question_id=>@question.id,:user_id=>dw,:is_display=>false)
    end
    puts @daily_winners
    return
  end

end
