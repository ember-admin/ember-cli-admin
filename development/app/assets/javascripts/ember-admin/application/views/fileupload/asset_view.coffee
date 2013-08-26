Admin.Fileupload.AssetView = Ember.View.extend
  attributeBindings: ["templateName"]

  deleteAsset: ->
    @get('asset').deleteRecord()
    @get('asset.store').commit()