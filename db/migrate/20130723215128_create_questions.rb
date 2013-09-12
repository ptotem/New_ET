class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :quiz_id
      t.date :insertion_date
      t.text :name
      t.boolean :is_mcq, default: false
      t.string :answer

      t.timestamps
    end
  end
end
