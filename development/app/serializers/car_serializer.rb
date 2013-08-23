class CarSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :color, :car_image_id

  def car_image_id
    object.car_image.try(:id)
  end
end