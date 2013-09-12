class DisplayTimeToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :display_time, :time
  end
end
