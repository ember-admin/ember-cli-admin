Admin.Mixins.Routes.ModelMixin =  Ember.Mixin.create

  _find_model: (modelName, options) ->
    return this.store.createRecord(modelName, {}) if options.action == "new"
    return @pagination(modelName) unless options.id
#    return @pagination(modelName, options.id) if @_checkPaginations()
    this.store.find(modelName, options.id)

  _setModel: (controller, model) ->
    return unless model
    return controller.set('model', Ember.Object.create(items:  model, __list: true)) if model.type
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Ember.String.singularize(name)