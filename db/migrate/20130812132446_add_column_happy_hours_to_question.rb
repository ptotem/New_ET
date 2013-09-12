class AddColumnHappyHoursToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :happy_hr, :datetime
  end
end
