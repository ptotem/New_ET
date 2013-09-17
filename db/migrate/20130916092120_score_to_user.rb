class ScoreToUser < ActiveRecord::Migration
  def change
    add_column :users, :score, :integer
  end
end
