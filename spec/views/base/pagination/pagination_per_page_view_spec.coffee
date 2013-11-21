describe "Admin.Base.Views.PaginationLinkView", ->
  beforeEach ->
    @subject = new TestEnv()
    @subject.usersController.set('model', {})
    @subject.view = Admin.Base.Views.PaginationPerPageView.create(controller: @subject.usersController)

  it 'isActive', ->
    expect(@subject.view.get('isActive')).toBeFalsy()
    @subject.view.set('count', 1)
    @subject.usersController.set('__perPage', 1)
    expect(@subject.view.get('isActive')).toBeTruthy()
