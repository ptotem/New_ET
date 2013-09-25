class CreatePromotionsQuestions < ActiveRecord::Migration
  def change
    create_table :promotions_questions do |t|
      t.integer :promotion_id
      t.integer :question_id

      t.timestamps
    end
  end
end
