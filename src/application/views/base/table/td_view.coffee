###
  if you have own attr for display in relation you should add this in didInsertElement and then ctrate own observer

  ["title", "name", "thumb_url", "my_atrr"].forEach (attr) =>
    @_defineValueProperty(attr, @get('attributeName'))
    @get("_value_#{attr}")

  _relationTitleObserver: (->
    @notifyPropertyChange("value")
  ).observes("_value_title")
###

Admin.Base.Views.Table.TdView = Ember.View.extend
  attributeBindings: ["style"]

  templateName: "base/_td_template"

  tagName: "td"

  didInsertElement: ->
    if Admin.DSL.Attributes.relations(@get('context').constructor).indexOf(@get('attributeName')) >= 0
      ["title", "name", "thumb_url"].forEach (attr) =>
        @_defineValueProperty(attr, @get('attributeName'))
        @get("_value_#{attr}")

  value:(->
    record = @get(@path())
    if typeof record == "object"
      @relation(record, @get('attributeName'))
    else
      record
  ).property("context.isLoaded")

  _relationTitleObserver: (->
    @notifyPropertyChange("value")
  ).observes("_value_title")

  _relationNameObserver: (->
    @notifyPropertyChange("value")
  ).observes("_value_name")

  _relationThumbUrlObserver: (->
    @notifyPropertyChange("value")
  ).observes("_value_thumb_url")

  color: (->
    if @get('attributeName').match /color/
      @set('text', true)
      @set('style', "color: #{@get('_value')};")
      false
  ).property('value')

  image_object:(->
    @get("context.#{@get('attributeName')}")
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

  relation: (record, property) ->
    if record
      record.get('name') || record.get('title') || record.get('thumb_url') || record.get('id')


  ###defines title, name, thumb_url observers
    _valueTitle, _valueName, _valueThubmUrl
  ###

  _defineValueProperty: (name, property) ->
    Ember.defineProperty(this, "_value_#{name}", Ember.computed(->
      record = @get(property)
      if typeof record == "object"
        @relation(record, property)
      else
        record
    ).property("context.#{property}.#{name}"))