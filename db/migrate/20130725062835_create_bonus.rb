class CreateBonus < ActiveRecord::Migration
  def change
    create_table :bonus do |t|
      t.string :name
      t.integer :multiplier
      t.integer :plus
      t.integer :minus
      t.boolean :wagerable
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
