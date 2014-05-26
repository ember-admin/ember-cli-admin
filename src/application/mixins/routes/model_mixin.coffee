Admin.Mixins.Routes.ModelMixin =  Ember.Mixin.create

  _find_model: (modelName, options) ->
    return this.store.createRecord(modelName, {}) if options.action == "new"
    return @pagination(modelName) unless options.id
    this.store.find(modelName, options.id)

  _setModel: (controller, model) ->
    return unless model

    if model.type
      console.log model.get('meta')
      return controller.set('model', Ember.Object.create(items:  model, __list: true))
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Ember.String.singularize(name)