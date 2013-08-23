class CarSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :color
end