Admin.Base.Views.Table.TdView = Ember.View.extend

  tagName: "td"

  value:(->
    Ember.defineProperty(this, '__value', Ember.computed(->
      @get(@path())
    ).property(@path()))
    @get("__value")
  ).property("__value")

  boolean:(->
    #implement for bool attrs metaForProperty user this fo find meta information about property
  ).property('context', 'attributeName')

  path: ->
    "context.%@".fmt(@get('attributeName'))