`import Ember from 'ember';`

modelMixin =  Ember.Mixin.create

  beforeModel: (transition) ->
    @action = undefined
    @page = undefined
    @perPage = undefined
    @modelName = @_modelName(transition.targetName)

  model: (options, transition) ->
    @page = options?.page || 1
    @perPage = options?.perPage || 25
    @_checkAction(options, transition.targetName)
    @_setAction(options.action) if options.action

    return unless this.container.lookupFactory('model:' + @modelName)

    if this.store.modelFor(@modelName)
      return @_find_model(@modelName, options)

  _find_model: (modelName, options) ->
    return this.store.createRecord(modelName, {}) if options.action == "new"
    return @pagination(modelName, {page: @page, perPage: @perPage}) unless options.id
    this.store.find(modelName, options.id)

  _setModel: (controller, model) ->
    return unless model

    if model.type
      return controller.set('model', Ember.Object.create(items:  model, __list: true, total: model.meta.total))
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Ember.String.singularize(name)

`export default modelMixin;`