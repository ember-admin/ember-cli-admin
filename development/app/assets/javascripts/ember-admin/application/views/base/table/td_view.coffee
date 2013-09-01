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

  tagName: "td"

  didInsertElement: ->
    if Admin.DSL.Attributes.relations(@get('context._reference').type).indexOf(@get('attributeName')) >= 0
      ["title", "name", "thumb_url"].forEach (attr) =>
        @_defineValueProperty(attr, @get('attributeName'))
        @get("_value_#{attr}")

  value:(->
    @get("color") if @get('attributeName').match /color/
    return @get('image') if @get('context.fileuploads') && @get('context.fileuploads').indexOf(@get('attributeName')) >=0
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

  boolean:(->
    #implement for bool attrs metaForProperty user this fo find meta information about property
  ).property('_value')

  image: (->
    path = "context.#{@get('attributeName')}.thumb_url"
    if @get(path)
      "<image src='#{@get(path)}'>"
  ).property('value')

  color: (->
    @set('style', "color: #{@get('_value')};")
  ).property('_value')

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