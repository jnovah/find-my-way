class ChangePlaces < ActiveRecord::Migration[5.1]
  def up
    remove_column :places, :lat
    remove_column :places, :long
    remove_column :places, :name
  end

  def down
    add_column :places, :lat, :string
    add_column :places, :long, :string
    add_column :places, :name, :string
  end
end
