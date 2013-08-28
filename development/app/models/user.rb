class User < ActiveRecord::Base
  has_many :user_cars, dependent: :destroy
  has_many :cars, through: :user_cars

  belongs_to :address

  has_one :avatar, -> { where is_main: true }, :as => :assetable, dependent: :destroy
end
