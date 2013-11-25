describe 'Admin.Logics.Breadcrumbs', ->
  beforeEach ->
    @subject = new TestEnv()
    @subject.breadcrumbsController = Admin.BreadcrumbsController.create()

    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model') != null

  it 'sets breadcrumbs in controller', ->
    runs ->
      Admin.Logics.Breadcrumbs.setup('show', @subject.usersController, @subject.usersController.get('model'), @subject.breadcrumbsController)
      expect(@subject.breadcrumbsController.get('content').length).toEqual(3)

      expect(@subject.breadcrumbsController.get('content')[0].get('name')).toEqual('dashboard')
      expect(@subject.breadcrumbsController.get('content')[0].get('url')).toEqual('#/')
      expect(@subject.breadcrumbsController.get('content')[0].get('class')).toEqual('first')
      expect(@subject.breadcrumbsController.get('content')[0].get('active')).toEqual(false)

      expect(@subject.breadcrumbsController.get('content')[1].get('name')).toEqual('users')
      expect(@subject.breadcrumbsController.get('content')[1].get('url')).toEqual('#/users')
      expect(@subject.breadcrumbsController.get('content')[1].get('class')).toEqual('')
      expect(@subject.breadcrumbsController.get('content')[1].get('active')).toEqual(false)

      expect(@subject.breadcrumbsController.get('content')[2].get('name')).toEqual(@subject.usersController.get('model.id'))
      expect(@subject.breadcrumbsController.get('content')[2].get('active')).toEqual(true)
      expect(@subject.breadcrumbsController.get('content')[2].get('class')).toEqual('active')

    runs ->
      Admin.Logics.Breadcrumbs.setup('page', @subject.usersController, @subject.usersController.get('model'), @subject.breadcrumbsController)
      expect(@subject.breadcrumbsController.get('content').length).toEqual(2)

    runs ->
      Admin.Logics.Breadcrumbs.setup('new', @subject.usersController, @subject.usersController.get('model'), @subject.breadcrumbsController)
      expect(@subject.breadcrumbsController.get('content').length).toEqual(3)
      expect(@subject.breadcrumbsController.get('content')[2].get('name')).toEqual(@subject.usersController.get('model.id'))

  it '_url', ->
    runs ->
      expect(Admin.Logics.Breadcrumbs._url('#/')).toEqual('#/')
    runs ->
      Admin.Logics.Config.set('namescpace', 'admin/')
      expect(Admin.Logics.Breadcrumbs._url('#/')).toEqual('/admin/#/')

  it '_actions', ->
    runs ->
      Admin.Logics.Breadcrumbs._actions('edit', @subject.usersController)
      expect(@subject.usersController.get('__breadcrumbsActionsArray')).toEqual(['new', 'show', 'destroy'])
    runs ->
      Admin.Logics.Breadcrumbs._actions('show', @subject.usersController)
      expect(@subject.usersController.get('__breadcrumbsActionsArray')).toEqual(['new', 'edit', 'destroy'])
    runs ->
      Admin.Logics.Breadcrumbs._actions('new', @subject.usersController)
      expect(@subject.usersController.get('__breadcrumbsActionsArray')).toEqual(['new'])
    runs ->
      Admin.Logics.Breadcrumbs._actions('page', @subject.usersController)
      expect(@subject.usersController.get('__breadcrumbsActionsArray')).toEqual(['new'])
    runs ->
      Admin.Logics.Breadcrumbs._actions('', @subject.usersController)
      expect(@subject.usersController.get('__breadcrumbsActionsArray')).toEqual(['new'])
