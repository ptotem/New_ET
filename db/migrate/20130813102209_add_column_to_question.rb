class AddColumnToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :tag_id, :integer
  end
end
