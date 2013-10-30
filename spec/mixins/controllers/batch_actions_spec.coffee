describe 'Admin.Base.Mixins.BatchActionsMixin', ->
  beforeEach ->
    @subject = new TestEnv()

    runs ->
      @subject.store.findAll('user').then (users)  =>
        @subject.usersController.set('model', Ember.Object.create())
        @subject.usersController.set('model.__list', true)
        @subject.usersController.set('model.items', users.toArray())
        @subject.usersController.set('__controller_name', 'users')

      waitsFor ->
        @subject.usersController.get('model.items') != null

  it 'baseBatchAction', ->
    runs ->
      @subject.usersController.set('__batches', @subject.usersController.get('model.items').toArray())
      runs ->
        @subject.usersController.send('baseBatchAction', "destroy")
      waitsFor ->
        @subject.usersController.get('model.items.lastObject') == undefined
      runs ->
        expect(@subject.usersController.get('__batches')).toEqual([])