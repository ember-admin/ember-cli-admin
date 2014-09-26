Admin.Mixins.Routes.PaginationMixin =  Ember.Mixin.create
  queryParams: {
    page: {
      refreshModel: true
    },
    perPage: {
      refreshModel: true
    }
  },

  pagination: (modelName) ->
    this.store.find(modelName, {page: @page, per_page: @perPage})

  _setPage: (page) ->
    @page = parseInt(page) || 1

  _setPerPage: (perPage) ->
    @perPage = parseInt(perPage) || 25

  _setupPaginationInfo: (controller) ->
    controller.set('__controller_name', @_controllerName(controller))
    controller.set('__model_name', @modelName)