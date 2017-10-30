class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.belongs_to :user
      t.string :title, null: false
      t.text :description

      t.timestamps
    end
  end
end
