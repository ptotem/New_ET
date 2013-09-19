class AddUserFbAccessTokenToUser < ActiveRecord::Migration
  def change
    add_column :users, :user_fb_access_token, :string
  end
end
