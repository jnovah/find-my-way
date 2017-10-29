class AddStatusTrips < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :status, :string, null: false
  end
end
