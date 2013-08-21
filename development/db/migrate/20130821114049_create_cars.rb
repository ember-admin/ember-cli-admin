class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :title, null: false
      t.text :description
      t.string :color
      t.timestamps
    end
  end
end