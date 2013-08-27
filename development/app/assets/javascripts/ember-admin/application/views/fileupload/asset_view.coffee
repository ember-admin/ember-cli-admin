Admin.Fileupload.AssetView = Admin.Base.Views.BaseActionView.extend
  attributeBindings: ["templateName", 'property']

  deleteAsset: ->
    @_showConfirmation()

  confirm: ->
    if @get('parentView.single')
      @_deleteBelongsTo()
    else
      @_deleteHasMany()

    transaction = this.get('asset.store').transaction()
    @get('asset').deleteRecord()
    transaction.add @get('asset')
    transaction.commit()
    @_super()

  _deleteBelongsTo: ->
    @get('asset').one 'didDelete', =>
      @get("context.model").set("#{@get('property')}", null)
      unless @get('controller.model.isDirty')
        state = DS.RootState.loaded
        @get("controller.model").set('currentState', state.saved)
      @set("parentView.asset", null)

  _deleteHasMany: ->

  action: (->
    {title: 'Delete', confirm: "Are you shure delete this?"}
  ).property()
