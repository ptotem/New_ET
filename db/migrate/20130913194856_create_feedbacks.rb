class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.string :comment
      t.string :email
      t.string :subject
      t.integer :user_id
      t.string :page

      t.timestamps
    end
  end
end
