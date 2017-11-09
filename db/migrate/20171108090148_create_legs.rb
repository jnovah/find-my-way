class CreateLegs < ActiveRecord::Migration[5.1]
  def change
    create_table :legs do |t|
      t.belongs_to :trip, null: false
      t.boolean :current, default: false
      t.boolean :complete, default: false
      t.integer :origin_id, null: false
      t.integer :destination_id, null: false
      t.integer :order, null: false

      t.timestamps
    end
  end
end
