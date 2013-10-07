class UserSerializer < ActiveModel::Serializer
  attributes :id, :lan, :lng, :zoom, :name, :email, :created_at, :updated_at, :address_id, :avatar_id, :avatar_ids

  def avatar_id
    object.avatar.try(:id)
  end

  def avatar_ids
    object.avatars.pluck(:id)
  end

  def address_id
    object.address_id
  end

end