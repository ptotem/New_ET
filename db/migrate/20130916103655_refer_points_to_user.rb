class ReferPointsToUser < ActiveRecord::Migration
  def change
    add_column :users, :refer_points, :integer,:default => 0
  end
end
