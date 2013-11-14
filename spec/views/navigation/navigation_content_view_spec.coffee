describe "Admin.NavigationContentView", ->
  beforeEach ->
    Admin.DSL.Navigation.map ->
      @navigate "Dashboard", route: "", divider: true
      @navigate "System", ->
        @navigate "Users"
        @navigate "Cars", divider: true

    @subject = new TestEnv()
    @subject.view = Admin.NavigationContentView.create(controller: @subject.usersController)
    @subject.usersController.set('model', {})

  it 'isActive', ->
    expect(@subject.view.get('isActive')).toBeFalsy()
    @subject.usersController.set('activeMenu', '/users')
    @subject.view.set('context', Admin.DSL.Navigation.content[1])
    expect(@subject.view.get('isActive')).toBeTruthy()
    @subject.view.set('context', Admin.DSL.Navigation.content[1].children[0])
    expect(@subject.view.get('isActive')).toBeTruthy()