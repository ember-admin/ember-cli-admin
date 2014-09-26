`import Ember from 'ember';`

Ember.EasyForm.Form.reopen
  submit: (event) ->
    _this = this
    promise = undefined
    event.preventDefault()
    return @get("controller").send @action if @get("context.isValid")
    if Ember.isNone(@get("context.isValid"))
      @get("controller").send @action
    else
      unless Ember.isNone(@get("context").validate)
        promise = @get("context").validate()
      else
        promise = @get("context.content").validate()
      promise.then ->
        _this.get("controller").send _this.action  if _this.get("context.isValid")

#    $('#'+ dom_input).live "keypress", (e) ->
#      if e.keyCode == 13
#        e.preventDefault()
