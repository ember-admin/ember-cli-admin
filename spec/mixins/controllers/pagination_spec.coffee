describe 'Admin.Mixins.Controllers.PaginationMixin', ->
  beforeEach ->
    @subject = new TestEnv()

    runs ->
      @subject.store.findAll('user').then (users)  =>
        @subject.usersController.set('model', Ember.Object.create())
        @subject.usersController.set('model.__list', true)
        @subject.usersController.set('model.items', users.toArray())

      waitsFor ->
        @subject.usersController.get('model.items') != null

  it 'changePerPage', ->
    runs ->
      expect(@subject.usersController.get('__perPage')).toEqual(25)
      expect(@subject.usersController.get('model.items.length')).toEqual(2)
      @subject.usersController.set('model.items', null)
      runs ->
        @subject.usersController.send("changePerPage", 26)
        waitsFor ->
          @subject.usersController.get('model.items') != null
        runs ->
          expect( @subject.usersController.get('model.items.length')).toEqual(2)