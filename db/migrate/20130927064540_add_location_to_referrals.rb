class AddLocationToReferrals < ActiveRecord::Migration
  def change
    add_column :referrals, :location, :string
  end
end
