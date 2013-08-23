class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :created_at, :updated_at, :address_id, :avatar_id

  def avatar_id
    object.avatar.try(:id)
  end

end