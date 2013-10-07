class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.belongs_to :address
      t.float :lan
      t.float :lng
      t.float :zoom
      t.timestamps
    end
    add_index :users, :email, :unique => true
  end
end
