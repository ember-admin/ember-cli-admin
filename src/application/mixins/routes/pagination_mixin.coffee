Admin.Mixins.Routes.PaginationMixin =  Ember.Mixin.create

  pagination: (modelName) ->
    perPage = (parseInt($.cookie('perPage')) || 25)
#    perPage = @get('perPage')
    this.store.find(modelName, {page: @page, per_page: perPage})

#  _checkPaginations: ->
#      @action == "page"
#
#  _setPage: (page) ->
#    @page = parseInt(page) || 1
#
#  _setPerPage: (perPage) ->
#    @perPage = parseInt(perPage) || 25

  _setupPaginationInfo: (controller) ->
#    controller.set('page', @page)
#    controller.set('perPage', @perPage)
    controller.set('__controller_name', @_controllerName(controller))
    controller.set('__model_name', @modelName)
#    Admin.Logics.Pagination.setup(controller, @page)