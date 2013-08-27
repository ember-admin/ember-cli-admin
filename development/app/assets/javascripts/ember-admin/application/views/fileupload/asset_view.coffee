Admin.Fileupload.AssetView = Ember.View.extend
  attributeBindings: ["templateName", 'property']

  deleteAsset: ->
    if @get('parentView.single')
      @_deleteBelongsTo()
    else
      @_deleteHasMany()
    @get('asset').deleteRecord()
    @get('asset.store').commit()


  _deleteBelongsTo: ->
    @get('asset').one 'didDelete', =>
      @set("parentView.asset", null)

  _deleteHasMany: ->
