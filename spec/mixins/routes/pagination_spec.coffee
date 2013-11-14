describe 'Admin.Mixins.Routes.PaginationMixin', ->
  beforeEach ->
    @subject = new TestEnv()
    @subject.route = Admin.MainRoute.create(store: @subject.store)

  it 'pagination', ->
    pagination = undefined
    runs ->
      pagination = @subject.route.pagination('user')
    waitsFor ->
      pagination != undefined
    runs ->
      expect(pagination).toBeDefined()

  it '_checkPaginations', ->
    @subject.route.action = "page"
    expect(@subject.route._checkPaginations()).toBeTruthy()
    @subject.route.action = "not page"
    expect(@subject.route._checkPaginations()).toBeFalsy()

  it '_setPage', ->
    @subject.route._setPage(1)
    expect(@subject.route.page).toEqual(1)

  it '_setupPaginationInfo', ->
    @subject.usersController.set('model', {})
    @subject.usersController.set('__controller_name', '')
    @subject.route._setupPaginationInfo(@subject.usersController)
    expect( @subject.usersController.get('__controller_name')).toEqual('users')
