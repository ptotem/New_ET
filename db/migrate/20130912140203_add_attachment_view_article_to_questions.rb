class AddAttachmentViewArticleToQuestions < ActiveRecord::Migration
  def self.up
    change_table :questions do |t|
      t.attachment :view_article
    end
  end

  def self.down
    drop_attached_file :questions, :view_article
  end
end
