class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :created_at, :updated_at, :address, :avatar, :avatars

  def avatar
    object.avatar.try(:id)
  end

  def avatars
    object.avatars.pluck(:id)
  end

  def address
    object.address_id
  end

end