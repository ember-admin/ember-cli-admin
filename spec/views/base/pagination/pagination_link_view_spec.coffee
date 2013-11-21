describe "Admin.Base.Views.PaginationLinkView", ->
  beforeEach ->
    @subject = new TestEnv()
    @subject.usersController.set('model', {})
    @subject.view = Admin.Base.Views.PaginationLinkView.create(controller: @subject.usersController)

  it '_nextPage', ->
    @subject.usersController.set('__nextPage', 2)
    expect(@subject.view._nextPage()).toEqual('#/users/page/2')

  it '_prevPage', ->
    @subject.usersController.set('__prevPage', 1)
    expect(@subject.view._prevPage()).toEqual('#/users/page/1')