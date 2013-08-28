class Car < ActiveRecord::Base

  has_one :car_image, -> { where is_main: true }, :as => :assetable, dependent: :destroy
  has_many :car_images, -> { where is_main: false }, :as => :assetable, dependent: :destroy

end
