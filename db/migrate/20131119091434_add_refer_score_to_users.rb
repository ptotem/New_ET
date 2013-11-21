class AddReferScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :refer_score, :integer,:default => 0
  end
end
