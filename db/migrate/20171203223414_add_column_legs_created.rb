class AddColumnLegsCreated < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :has_legs, :boolean, default: false
  end
end
