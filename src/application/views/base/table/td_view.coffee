###
  if you have own attr for display in relation you should change relations property

  if you have own image property you should change fileuploads property

###

Admin.Base.Views.Table.TdView = Ember.View.extend
  attributeBindings: ["style"]

  relations: "name title".w()
  fileuploads: "thumb_url".w()

  templateName: "base/_td_template"

  tagName: "td"

  createObserves:(->
    if @get('context.fileuploads') && @get('context.fileuploads').indexOf(@get('attributeName')) >= 0
      @get('fileuploads').forEach (attr) =>
        @addObserver("context.#{@get('attributeName')}.#{attr}", ->
          @notifyPropertyChange("value")
        )
      return
    if Admin.DSL.Attributes.relations(@get('context').constructor).indexOf(@get('attributeName')) >= 0
      @get('relations').forEach (attr) =>
        @addObserver("context.#{@get('attributeName')}.#{attr}", @, ->
          @notifyPropertyChange("value")
        )
      return
    @addObserver("context.#{@get('attributeName')}", @, ->
      @notifyPropertyChange("value")
    )
  ).on('didInsertElement')

  value:(->
    record = @get(@path())
    return record if !record || (!record['get'] || !record.get('id'))
    @relation(record, @get('attributeName'))
  ).property("context")

  image_object:(->
    @get("context.#{@get('attributeName')}")
  ).property('value')

  color: (->
    if @get('attributeName').match /color/
      @set('text', true)
      @set('style', "color: #{@get('_value')};")
  ).property('value')

  image: (->
    if @get('context.fileuploads') && @get('context.fileuploads').indexOf(@get('attributeName')) >=0
      @set('text', false)
      true
  ).property('value')

  text: (->
    true
  ).property('value')

  path: ->
    "context.%@".fmt(@get('attributeName'))

  relation: (record) ->
    return unless record
    value = ""
    if @get('context.fileuploads') && @get('context.fileuploads').indexOf(@get('attributeName')) >= 0
      @get('fileuploads').forEach (attr) => value = record.get(attr) if record.get(attr)
    if Admin.DSL.Attributes.relations(@get('context').constructor).indexOf(@get('attributeName')) >= 0
      @get('relations').forEach (attr) => value = record.get(attr) if record.get(attr)
    value