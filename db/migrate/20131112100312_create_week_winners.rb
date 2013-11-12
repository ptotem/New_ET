class CreateWeekWinners < ActiveRecord::Migration
  def change
    create_table :week_winners do |t|
      t.integer :user_id
      t.integer :points
      t.integer :year
      t.integer :week_no

      t.timestamps
    end
  end
end
