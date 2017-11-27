class ChangeLegs < ActiveRecord::Migration[5.1]
  def change
    add_column :legs, :distance, :hstore, default: {}, null: false
    add_column :legs, :duration, :hstore, default: {}, null: false
    add_column :legs, :origin_location, :hstore, defualt: {}, null: false
    add_column :legs, :destination_location, :hstore, default: {}, null: false
  end
end
