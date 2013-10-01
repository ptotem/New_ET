class CreateDailyWinners < ActiveRecord::Migration
  def change
    create_table :daily_winners do |t|
      t.integer :user_id
      t.integer :question_id
      t.boolean :is_display

      t.timestamps
    end
  end
end
