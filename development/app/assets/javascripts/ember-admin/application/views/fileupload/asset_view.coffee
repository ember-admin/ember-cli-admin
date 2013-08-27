Admin.Fileupload.AssetView = Admin.Base.Views.BaseActionView.extend
  attributeBindings: ["templateName", 'property']

  deleteAsset: ->
    @_showConfirmation()

  confirm: ->
    if @get('parentView.single')
      @_deleteBelongsTo()
    else
      @_deleteHasMany()
    @get('asset').deleteRecord()
    @get('asset.store').commit()
    @_super()

  _deleteBelongsTo: ->
    @get('asset').one 'didDelete', =>
      @set("parentView.asset", null)

  _deleteHasMany: ->

  action: (->
    {title: 'Delete', confirm: "Are you shure delete this?"}
  ).property()
