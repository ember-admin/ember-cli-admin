describe 'Admin.Base.Mixins.BaseActionsMixin', ->
  beforeEach ->
    @subject = new TestEnv(Admin.Base.Mixins.BaseActionsMixin)

    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model.id') != null

  describe 'actions', ->
    it 'new', ->
      runs ->
        @subject.usersController.send('new')
        expect(window.location.hash).toEqual('#/users/new')

    it 'edit', ->
      runs ->
        model = @subject.usersController.get('model')
        @subject.usersController.send('edit', model)
        expect(window.location.hash).toEqual('#/users/1/edit')

    it 'show', ->
      runs ->
        model = @subject.usersController.get('model')
        @subject.usersController.send('show', model)
        expect(window.location.hash).toEqual('#/users/1/show')

    it 'update', ->
      runs ->
        model = @subject.usersController.get('model')
        model.set('email', 12)
        expect(model.get('isDirty')).toEqual(true)
        runs ->
          @subject.usersController.send('update', model)
        waitsFor ->
          model.get('isDirty') == false
        runs ->
          expect(model.get('isDirty')).toBe(false)

    it 'destroy', ->
      runs ->
        model = @subject.usersController.get('model')
        @subject.usersController.send('destroy', model)
        waitsFor ->
          model.get('isDeleted') == true
        runs ->
          expect(model.get('isDeleted')).toBe(true)

  it '_path', ->
    runs ->
      model = @subject.usersController.get('model')
      expect(@subject.usersController._path(model, 'edit')).toEqual('/users/1/edit')
      expect(@subject.usersController._path('new')).toEqual('/users/new')