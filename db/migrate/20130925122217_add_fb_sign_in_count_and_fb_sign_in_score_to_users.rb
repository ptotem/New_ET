class AddFbSignInCountAndFbSignInScoreToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fb_sign_in_count, :integer, :default => 0
    add_column :users, :fb_sign_in_score, :integer, :default => 0
  end
end
