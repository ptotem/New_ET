class ScoreToReferral < ActiveRecord::Migration
  def change
    add_column :referrals, :score, :integer
  end
end
