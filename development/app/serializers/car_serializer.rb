class CarSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :color, :car_image_id, :car_image_ids

  def car_image_id
    object.car_image.try(:id)
  end

  def car_image_ids
    object.car_images.pluck(:id)
  end
end