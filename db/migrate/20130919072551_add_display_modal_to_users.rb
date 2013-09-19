class AddDisplayModalToUsers < ActiveRecord::Migration
  def change
    add_column :users, :display_modal, :boolean, :default => false
  end
end
