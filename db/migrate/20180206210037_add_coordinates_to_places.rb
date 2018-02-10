class AddCoordinatesToPlaces < ActiveRecord::Migration[5.1]
  def change
    add_column :places, :coordinates, :hstore, null: false
    add_column :places, :google_place_id, :string, null: false
  end
end
