###
  if you have own attr for display in relation you should change relations property

  if you have own image property you should change fileuploads property

###
`import Ember from 'ember';`
`import Attributes from 'emberadmin/dsl/attributes';`

tdComponent = Ember.Component.extend
  attributeBindings: ["style", 'data-column']

  relations: "name title".w()
  fileuploads: "thumb_url".w()

#  templateName: "base/_td_template"

  tagName: "td"

  'data-column': Ember.computed.alias('attributeName')

  createObserves:(->
    if @get('item.fileuploads') && @get('item.fileuploads').indexOf(@get('attributeName')) >= 0
      @get('fileuploads').forEach (attr) =>
        @addObserver("item.#{@get('attributeName')}.#{attr}", ->
          @notifyPropertyChange("value")
        )
      return
    if Attributes.relations(@get('item').constructor).indexOf(@get('attributeName')) >= 0
      @get('relations').forEach (attr) =>
        @addObserver("item.#{@get('attributeName')}.#{attr}", @, ->
          @notifyPropertyChange("value")
        )
      return
    @addObserver("item.#{@get('attributeName')}", @, ->
      @notifyPropertyChange("value")
    )
  ).on('didInsertElement')

  value:(->
    record = @get(@path())
    return record if !record || (!record['get'] || !record.get('id'))
    @relation(record, @get('attributeName'))
  ).property("item")

  image_object:(->
    @get("item.#{@get('attributeName')}")
  ).property('value')

  color: (->
    if @get('attributeName').match /color/
      @set('text', true)
      @set('style', "color: #{@get('_value')};")
  ).property('value')

  image: (->
    if @get('item.fileuploads') && @get('item.fileuploads').indexOf(@get('attributeName')) >=0
      @set('text', false)
      true
  ).property('value')

  text: (->
    true
  ).property('value')

  path: ->
    "item.%@".fmt(@get('attributeName'))

  relation: (record) ->
    return unless record
    value = ""
    if @get('item.fileuploads') && @get('item.fileuploads').indexOf(@get('attributeName')) >= 0
      @get('fileuploads').forEach (attr) => value = record.get(attr) if record.get(attr)
    if Attributes.relations(@get('item').constructor).indexOf(@get('attributeName')) >= 0
      @get('relations').forEach (attr) => value = record.get(attr) if record.get(attr)
    value

  actions:
    openImagePreview: ->
      @sendAction('action', this.get('image_object.url'))

`export default tdComponent;`