class CarSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :color, :car_image, :car_images

  def car_image
    object.car_image.try(:id)
  end

  def car_images
    object.car_images.pluck(:id)
  end
end