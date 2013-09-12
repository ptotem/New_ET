class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :question_id
      t.integer :option_id
      t.integer :user_id
      t.string :answer
      t.boolean :is_correct
      t.boolean :is_correct
      t.integer :points

      t.timestamps
    end
  end
end
