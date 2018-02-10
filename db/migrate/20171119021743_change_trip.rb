class ChangeTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :bounds, :hstore, default: {}, null: false
  end
end
