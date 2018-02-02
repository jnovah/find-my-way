class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.belongs_to :trip, null: false
      t.string :type, null: false
      t.string :google_place_id, null: false
      t.string :address
      t.string :name
      t.string :lat
      t.string :long

      t.timestamps
    end
  end
end
