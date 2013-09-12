class CreateOptions < ActiveRecord::Migration
  def change
    create_table :options do |t|
      t.integer :question_id
      t.string :name
      t.boolean :is_correct

      t.timestamps
    end
  end
end
