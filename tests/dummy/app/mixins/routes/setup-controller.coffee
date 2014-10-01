`import Ember from 'ember';`
`import Attributes from 'dummy/dsl/attributes';`

setupControllerMixin = Ember.Mixin.create
  setupController:(controller, model) ->
    @_setSiteTitle(controller, model)
    if model
      @_setModel(controller, model)
      type = (model.type || model.constructor)
      controller.set('modelAttributes', Attributes.detect(type))
      controller.set('batches', [])

`export default setupControllerMixin`