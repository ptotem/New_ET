class CreateQuizzes < ActiveRecord::Migration
  def change
    create_table :quizzes do |t|
      t.string :name
      t.boolean :is_survey
      t.integer :plus
      t.integer :minus

      t.timestamps
    end
  end
end
