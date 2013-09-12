class CreateBonusQuizzesTable < ActiveRecord::Migration
  def change
    create_table :bonus_quizzes, :id => false do |t|
      t.integer :question_id
      t.integer :bonus_id
    end
  end
end
