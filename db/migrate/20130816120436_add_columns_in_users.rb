class AddColumnsInUsers < ActiveRecord::Migration
  def change
    add_column :users, :age, :integer
    add_column :users, :workx, :integer
    add_column :users, :name, :string
    add_column :users, :location, :string
    add_column :users, :industry, :string
  end
end
