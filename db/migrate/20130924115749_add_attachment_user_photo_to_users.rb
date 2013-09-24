class AddAttachmentUserPhotoToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :user_photo
    end
  end

  def self.down
    drop_attached_file :users, :user_photo
  end
end
