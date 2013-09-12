class ChangeTimeForDisplayTime < ActiveRecord::Migration
  def self.up
    change_table :questions do |t|
      t.change :display_time, :datetime
    end
  end
  def self.down
    change_table :questions do |t|
      t.change :display_time, :date
    end
  end
end
