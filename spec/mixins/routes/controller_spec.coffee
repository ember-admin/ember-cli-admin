describe 'Admin.Mixins.Routes.ControllerMixin', ->
  beforeEach ->
    @subject = new TestEnv()
    @subject.route = Admin.MainRoute.create(store: @subject.store)

  it '_getForm', ->
    expect(@subject.route._getForm(@subject.usersController)).toEqual('form')

  it '_getControllerTemplate', ->
    expect(@subject.route._getControllerTemplate(@subject.usersController)).toEqual('main')
    @subject.route.action = "new"
    expect(@subject.route._getControllerTemplate(@subject.usersController)).toEqual('new')
    @subject.route.action = "edit"
    expect(@subject.route._getControllerTemplate(@subject.usersController)).toEqual('edit')

  it '_controllerName', ->
    expect(@subject.route._controllerName(@subject.usersController)).toEqual('users')

  it '_checkAction', ->
    options = {}
    @subject.route._checkAction(options, "users.new")
    expect(options.action).toEqual("new")
    options = {}
    @subject.route._checkAction(options, "users")
    expect(options.action).toBeUndefined()