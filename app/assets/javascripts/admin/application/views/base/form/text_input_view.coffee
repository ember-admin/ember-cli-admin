Admin.Base.Views.TextInputView = Ember.TextField.extend
  classNames: ["form-control"]
  attributeBindings: ["value", "readonly"]

  readonly: (->
    @get('attributeName') == 'id'
  ).property()

  value:( ->
    @get(@path())
  ).property('context', 'attributeName')

  path: ->
    "context.%@".fmt(@get('attributeName'))

  focusOut: (event)->
    @get('context').set(@get('attributeName'), @get('value'))
