Admin.Fileupload.DragAndDropZoneView = Ember.View.extend
  attributeBindings: ["property", "assetTemplate"]

  assetTemplate: "fileuploads/asset"

  templateName: "fileuploads/drag_and_drop_zone"

  didInsertElement: ->
    @get('single')

  single:(->
    Admin.DSL.Attributes.isBelongsTo(@get("context.model").constructor, @get('property'))
  ).property('context')

  assets: (->
    Ember.defineProperty(this, "_assets", Ember.computed(->
      @get("context.#{@get('property')}")
    ).property("context.#{@get('property')}"))
    @get('_assets')
  ).property('_assets')

  asset: (->
    Ember.defineProperty(this, "_asset", Ember.computed(->
      @get("context.#{@get('property')}")
    ).property("context.#{@get('property')}"))
    @get('_asset')
  ).property('_asset')

  actions:
    selectFile: () ->
      files = event.target.files
      for file in files
        @createAsset(file)

  drop: (e) ->
    e.stopPropagation()
    e.preventDefault()

    files = e.dataTransfer.files
    for file in files
      @createAsset(file)

  dragOver: (e) ->
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'

  dragLeave: (e) ->
    e.stopPropagation()
    e.preventDefault()

  dragEnter: (e) ->
    e.stopPropagation()
    e.preventDefault()
    
  createAsset: (file) ->
    @set('creating', true)
    if @get('single')
      if @get("controller.model.#{@get('property')}")
        @get("controller.model.#{@get('property')}").deleteRecord()
        @get("controller.model.#{@get('property')}").save()
      @_createAsset(@_params(file), file)
    else
      @_createAsset(@_params(file), file)

  _createAsset: (params, file) ->
    store = @get('controller.store')
    asset = store.createRecord(@get('property'), $.extend({}, params))
    asset.set('file', file)
    @get('controller').send("createAsset", asset, @get('property'), @)

  _params: (file)->
    params =
      assetable_type: @get('controller.model.__model_name').classify()
      content_type: file.type
      original_filename: file.name
      is_main: true

    params.assetable_id = @get('context.id') if @get('context.id')

    params.is_main = false unless @get('single')
    params

  clearInput: ->
    @$().find("input[type=file]").val('')