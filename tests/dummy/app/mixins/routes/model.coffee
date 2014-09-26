`import Ember from 'ember';`

modelMixin =  Ember.Mixin.create

  _find_model: (modelName, options) ->
    return this.store.createRecord(modelName, {}) if options.action == "new"
    return @pagination(modelName) unless options.id
    this.store.find(modelName, options.id)

  _setModel: (controller, model) ->
    return unless model

    if model.type
      return controller.set('model', Ember.Object.create(items:  model, __list: true, total:model.meta.total))
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Ember.String.singularize(name)

`export default modelMixin;`