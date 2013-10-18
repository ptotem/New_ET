class AddAttachmentUserPictureToUsers < ActiveRecord::Migration

  def self.up
    add_attachment :users, :user_picture
  end

  def self.down
    remove_attachment :users, :user_picture
  end
end
