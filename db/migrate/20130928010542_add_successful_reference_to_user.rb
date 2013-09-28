class AddSuccessfulReferenceToUser < ActiveRecord::Migration
  def change
    add_column :users, :successful_reference, :integer,:default => 0
  end
end
