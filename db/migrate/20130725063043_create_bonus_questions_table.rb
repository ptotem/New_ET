class CreateBonusQuestionsTable < ActiveRecord::Migration
  def change
    create_table :bonus_questions do |t|
      t.integer :question_id
      t.integer :bonus_id
    end
  end
end
