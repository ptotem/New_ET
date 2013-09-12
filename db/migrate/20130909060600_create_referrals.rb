class CreateReferrals < ActiveRecord::Migration
  def change
    create_table :referrals do |t|
      t.integer :user_id
      t.string :referred_mail

      t.timestamps
    end
  end
end
