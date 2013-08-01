Admin.Base.Views.Table.TdView = Ember.View.extend

  tagName: "td"

  value:( ->
    @get(@path())
  ).property('context', 'attributeName')

  boolean:(->
    #implement for bool attrs metaForProperty user this fo find meta information about property
  ).property('context', 'attributeName')

  path: ->
    "context.%@".fmt(@get('attributeName'))
