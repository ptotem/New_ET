class CloseTimeToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :close_time, :time
  end
end
