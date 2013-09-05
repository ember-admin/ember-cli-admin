class AssetSerializer < ActiveModel::Serializer

  attributes :id, :assetable_id, :assetable_type, :guid, :type, :original_filename, :thumb_url, :url

  def original_filename
    object.data
  end

  def content_type

  end

  def thumb_url
    object.data.versions[:thumb].try(:url)
  end

  def url
    object.data.versions[:large].try(:url)
  end

end