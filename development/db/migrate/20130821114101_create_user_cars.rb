class CreateUserCars < ActiveRecord::Migration
  def change
    create_table :user_cars do |t|
      t.references :user
      t.references :car
      t.timestamps
    end
    add_index :user_cars, :car_id
    add_index :user_cars, :user_id
  end
end
