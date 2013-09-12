class ChangeTimeForCloseTime < ActiveRecord::Migration
  def self.up
    change_table :questions do |t|
      t.change :close_time, :datetime
    end
  end
  def self.down
    change_table :questions do |t|
      t.change :close_time, :date
    end
  end
end
