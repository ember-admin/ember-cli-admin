class Car < ActiveRecord::Base

  has_one :car_image, :as => :assetable, dependent: :destroy

end
