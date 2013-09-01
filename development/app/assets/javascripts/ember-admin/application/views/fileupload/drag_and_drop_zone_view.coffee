Admin.Fileupload.DragAndDropZoneView = Ember.View.extend
  attributeBindings: ["property", "assetTemplate"]

  assetTemplate: "fileuploads/asset"

  templateName: "fileuploads/drag_and_drop_zone"

  didInsertElement: ->
    @get('single')


  single:(->
    Admin.DSL.Attributes.isBelongsTo(@get("context.model._reference").type, @get('property'))
  ).property('context')

  assets:(->
    Ember.defineProperty(this, "_assets", Ember.computed( ->
      @get("context.#{@get('property')}")
    ).property("context.#{@get('property')}.@each.isLoaded"))
    @get('_assets')
  ).property('_assets')

  asset:(->
    Ember.defineProperty(this, "_asset", Ember.computed( ->
      @get("context.#{@get('property')}")
    ).property("context.#{@get('property')}"))
    @get('_asset')
  ).property('_asset')

  selectFile: ->
    files = event.target.files
    for file in files
      @createAsset(file)

  createAsset: (file) ->
    @set('creating', true)
    if @get('single')
      if @get("controller.model.#{@get('property')}")
        @get("controller.model.#{@get('property')}").deleteRecord()
        @get("controller.model.#{@get('property')}.store").commit()
      @_createAsset(@_params(file), file)
    else
      @_createAsset(@_params(file), file)

  _createAsset: (params, file) ->
    type = @get('context._reference').type
    assetType = Admin.DSL.Attributes.relationForType(type, @get('property'))
    asset = assetType.createRecord(params)
    asset.set('file', file)

    transaction = asset.get('store').transaction()
    transaction.add asset
    transaction.commit()

    asset.addObserver 'id', (sender, key, value, context, rev) =>
      @set('creating', false)
      @_clearInput()
      if @get('single')
        @_createBelongsTo(asset)
      else
        @_createHasMany(asset)

  _params: (file)->
    params =
      assetable_type: @get('controller.__type')
      content_type: file.type
      original_filename: file.name
      is_main: true

    params.assetable_id = @get('context.id') if @get('context.id')

    params.is_main = false unless @get('single')
    params

  _createBelongsTo: (asset) ->
    @get("context.model").set("#{@get('property')}", asset)
    if @get('context.model.isDirty')
      if @get('context.model.id')
        state = DS.RootState.loaded.saved
        @get("context.model").set('currentState', state)
    @set("asset", asset)

  _createHasMany: (asset) ->
    @get("context.model.#{@get('property')}").pushObject(asset)

  _clearInput: ->
    @$().find("input[type=file]").val('')