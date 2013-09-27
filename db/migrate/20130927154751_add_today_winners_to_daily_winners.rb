class AddTodayWinnersToDailyWinners < ActiveRecord::Migration
  def change
    add_column :daily_winners, :today_winners, :date
  end
end
