Admin.Base.Views.Table.TdView = Ember.View.extend

  tagName: "td"

  value:(->
    property = @path()
    @_defineValueObserver()
    @_defineValueProperty("_value", property)
    @get("_value")
  ).property("_value")

  _relationObserver: (->
    @notifyPropertyChange("value")
  ).observes("_valueObserver.isLoaded")

  boolean:(->
    #implement for bool attrs metaForProperty user this fo find meta information about property
  ).property('context', 'attributeName')

  path: ->
    "context.%@".fmt(@get('attributeName'))

  relation: (record) ->
    if record
      record.get('title') || record.get('name') || record.get('id')

  _defineValueProperty: (name, property) ->
    Ember.defineProperty(this, name, Ember.computed(->
      record = @get(property)
      if typeof record == "object"
        @relation(record)
      else
        record
    ).property(property))

  _defineValueObserver: ->
    Ember.defineProperty(this, "_valueObserver", Ember.computed(->
      @get(@path())
    ).property(@path()))

