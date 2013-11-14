Admin.Mixins.Routes.PaginationMixin =  Ember.Mixin.create

  pagination: (modelName) ->
    perPage = ($.cookie('perPage') || 25)
    this.store.find(modelName, {page: @page, per_page: perPage})

  _checkPaginations: ->
      @action == "page"

  _setPage: (page) ->
    @page = parseInt(page) || 1

  _setupPaginationInfo: (controller) ->
    controller.set('__page', @page)
    controller.set('__controller_name', @_controllerName(controller))
    controller.set('__model_name', @modelName)
    Admin.Logics.Pagination.setup(controller, @page)