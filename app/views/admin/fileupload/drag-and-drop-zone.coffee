`import Ember from 'ember'`
`import Attributes from 'ember-cli-admin/dsl/attributes'`
dragAndDropZoneView = Ember.View.extend
  attributeBindings: ["property", "assetTemplate"]

  assetTemplate: "admin/fileuploads/asset"

  templateName: "admin/fileuploads/drag-and-drop-zone"

  didInsertElement: ->
    @get('single')

  single:(->
    Attributes.isBelongsTo(@get("model").constructor, @get('property'))
  ).property('model')

  assets: (->
    Ember.defineProperty(this, "_assets", Ember.computed(->
      @get("model.#{@get('property')}")
    ).property("model.#{@get('property')}"))
    @get('_assets')
  ).property('_assets')

  asset: (->
    Ember.defineProperty(this, "_asset", Ember.computed(->
      @get("model.#{@get('property')}")
    ).property("model.#{@get('property')}"))
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
      if @get("model.#{@get('property')}")
        @get("model.#{@get('property')}").deleteRecord()
        @get("model.#{@get('property')}").save()
      @_createAsset(@_params(file), file)
    else
      @_createAsset(@_params(file), file)

  _createAsset: (params, file) ->
    store = @get('controller.store')
    asset = store.createRecord(Ember.String.singularize(@get('property')), $.extend({}, params))
    asset.set('file', file)
    @get('controller').send("createAsset", asset, @get('property'), @)

  _params: (file)->
    params =
      assetable_type: Ember.String.singularize(@get('controller._name')).classify()
      content_type: file.type
      original_filename: file.name
      is_main: true

    params.assetable_id = @get('model.id') if @get('model.id')

    params.is_main = false unless @get('single')
    params

  clearInput: ->
    @$().find("input[type=file]").val('')

`export default dragAndDropZoneView`