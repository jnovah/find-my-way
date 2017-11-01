class RemoveColumnFromPlaces < ActiveRecord::Migration[5.1]
  def change
    remove_column :places, :google_place_id, :string
  end
end
