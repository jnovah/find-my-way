class CreateMemories < ActiveRecord::Migration[5.1]
  def change
    create_table :memories do |t|
      t.belongs_to :place, null: false
      t.string :type, null: false, inclusion: { in: ["photo", "journal"] }
      t.string :image
      t.text :text_body, null: false

      t.timestamps
    end
  end
end
