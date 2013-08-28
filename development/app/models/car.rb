class Car < ActiveRecord::Base

  has_one :car_image, -> { where is_main: true }, :as => :assetable, dependent: :destroy

end
