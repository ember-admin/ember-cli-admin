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
  ).property()

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
    if @get('single')
      if @get('context.id')
        params =
          assetable_type: @get('controller.__type')
          assetable_id: @get('context.id')
          content_type: file.type
          original_filename: file.name
      else
        params =
          assetable_type: @get('controller.__type')
          guid: @guid()
          content_type: file.type
          original_filename: file.name

      @_createAsset(params, file)
    else

  _createAsset: (params, file) ->
    type = @get('context._reference').type
    assetType = Admin.DSL.Attributes.relationForType(type, @get('property'))
    asset = assetType.createRecord(params)
    asset.set('file', file)
    asset.get('store').commit()

  s4: ->
    Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

  guid: ->
    @s4() + @s4() + '-' + @s4() + '-' + @s4() + '-' + @s4() + '-' + @s4() + @s4() + @s4()