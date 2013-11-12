class CreateWeeklyLeaders < ActiveRecord::Migration
  def change
    create_table :weekly_leaders do |t|
      t.integer :user_id
      t.integer :points
      t.integer :year
      t.integer :week_no

      t.timestamps
    end
  end
end
