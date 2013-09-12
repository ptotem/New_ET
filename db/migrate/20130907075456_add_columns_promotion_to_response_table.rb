class AddColumnsPromotionToResponseTable < ActiveRecord::Migration
  def change
    add_column :responses, :promotion, :boolean
  end
end
