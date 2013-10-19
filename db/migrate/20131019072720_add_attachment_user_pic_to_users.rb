class AddAttachmentUserPicToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :user_pic
    end
  end

  def self.down
    drop_attached_file :users, :user_pic
  end
end
