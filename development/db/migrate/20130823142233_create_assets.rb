class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.string  :data, null: false

      t.integer :assetable_id
      t.string  :assetable_type, limit: 30, null: false
      t.string  :type, limit: 30
      t.string  :guid, limit: 50

      t.timestamps
    end

    add_index :assets, [:assetable_type, :type, :assetable_id]
    add_index :assets, :guid
  end
end
