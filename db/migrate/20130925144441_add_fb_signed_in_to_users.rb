class AddFbSignedInToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fb_signed_in, :boolean, :default => false
  end
end
