Admin.MainRoute = Ember.Route.extend

  model: (options, transition) ->
    @action = undefined
    @page = undefined

    modelName = @_modelName(transition.targetName)
    modelType = @_modelType(modelName)

    @_checkNewAction(options, transition.targetName)
    @_setAction(options.action) if options.action
    if modelType
      @_find_model(modelType, options)

  setupController:(controller, model) ->
    @_setSiteTitle(controller, model)
    if model
      @_setModel(controller, model)
      type = (model.type || model.get('_reference').type)
      @_setType(controller, type)
      @_setupPaginationInfo(controller)
      controller.set('modelAttributes', Admin.DSL.Attributes.detect(type))
      controller.set('batches', [])

  renderTemplate: (controller, model) ->
    @_setActiveRoute()
    @_setupBreadscrumbs(controller, model)
    @render @_getControllerTemplate(controller), {outlet: "main", controller: controller}
    @render 'navigation', {
      outlet: 'navigation'
      controller: 'navigation'
    }
    @render 'breadcrumbs',{
      outlet: 'breadcrumbs'
      controller: 'breadcrumbs'
    }
    if @action && (@action == "edit" || @action == "new")
      @render @_getForm(controller), {
        into: @action
        outlet: 'form'
        controller: controller
      }

  pagination: (modelType, param) ->
    perPage = ($.cookie('perPage') || 25)
    modelType.find({page: @_page(param), per_page: perPage})

  _getForm:(controller) ->
    form = "%@_form".fmt(@_controllerName(controller).decamelize())
    if  Ember.TEMPLATES[form]
      form
    else
      "form"

  _find_model: (modelType, options) ->
    return modelType.createRecord() if options.action == "new"
    return @pagination(modelType, "_page=1") unless options.id
    return @pagination(modelType, options.id) if @_checkPaginations(options.id)
    modelType.find(options.id)

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
    if Ember.TEMPLATES[name]
      name
    else
      if @action then @action else "main"

  _controllerName: (controller) ->
    controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)/, '')

  _setActiveRoute: ->
    url = Ember.Location.create({implementation: 'hash'}).getURL()
    url = "/" + url.split("/")[1]
    @controllerFor("navigation").set('activeMenu', url)

  _setModel: (controller, model) ->
    return unless model
    return controller.set('model', Ember.Object.create(items:  model)) if model.type
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Admin.DSL.Attributes.singularize(name)

  _modelType: (modelName) ->
    eval("Admin.%@".fmt(modelName.classify()))

  _checkPaginations: (id) ->
    /_page=\d+/.test id

  _page: (id) ->
    @page = parseInt(/_page=(\d+)/.exec(id)[1])
    @page

  _setAction: (action) ->
    @action = action

  _checkNewAction: (options, target) ->
    if /\./.test(target)
      target = target.split(".")[1]
      options.action = "new" if target == "new"

  _setupBreadscrumbs: (controller, model)->
    content = []
    obj = Ember.Object.create({name: "dashboard", url: "/#/", active: false})
    content.pushObject(obj)
    obj = Ember.Object.create({name: controller.get('__controller_name'), url: "/#/#{controller.get('__controller_name')}", active: true})
    if @action
      obj.set('active', false)
      content.pushObject(obj)
      name = (model.get('id') || @action)
      obj = Ember.Object.create({name: name, active: true})
      content.pushObject(obj)
    else
      content.pushObject(obj)
    @controllerFor("breadcrumbs").set('content', content)

  _setupPaginationInfo: (controller) ->
    controller.set('__page', @page)
    controller.set('__controller_name', @_controllerName(controller))
    if @page
      nextPage = @page + 1
      prevPage = if @page - 1 < 1 then 1 else @page - 1
      controller.set('__nextPage', nextPage)
      controller.set('__prevPage', prevPage)
    else
      controller.set('__nextPage', undefined)
      controller.set('__prevPage', undefined)

  _setType: (controller, type) ->
    controller.set('__type', type.toString().replace("Admin.", ""))

  _setSiteTitle: (controller, model) ->
    if @action
      document.title = "%@ - %@ - %@".fmt(@_controllerName(controller), model.get('id'), @action)
    else
      document.title = "%@ - list".fmt(@_controllerName(controller))
