class ChangeTrips < ActiveRecord::Migration[5.1]
  def up
    remove_column :trips, :status, null: false
    add_column :trips, :planning, :boolean, default: true, null: false
    add_column :trips, :en_route, :boolean, default: false, null: false
    add_column :trips, :completed, :boolean, default: false, null: false
  end

  def down
    add_column :trips, :status, :string
    remove_column :trips, :planning, :boolean, default: true, null: false
    remove_column :trips, :en_route, :boolean, default: false, null: false
    remove_column :trips, :completed, :boolean, default: false, null: false
  end
end
