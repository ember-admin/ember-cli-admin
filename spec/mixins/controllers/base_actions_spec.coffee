describe 'Admin.Mixins.Controllers.BaseActionsMixin', ->
  beforeEach ->
    @subject = new TestEnv()

    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model.id') != null


  it 'update', ->
    runs ->
      model = @subject.usersController.get('model')
      model.set('email', 12)
      expect(model.get('isDirty')).toEqual(true)
      runs ->
        model.save()
      waitsFor ->
        model.get('isDirty') == false
      runs ->
        expect(model.get('isDirty')).toBe(false)

  it 'destroy', ->
    runs ->
      model = @subject.usersController.get('model')
      model.deleteRecord()
      model.save()
      waitsFor ->
        model.get('isDeleted') == true
      runs ->
        expect(model.get('isDeleted')).toBe(true)

  it '_path', ->
    runs ->
      model = @subject.usersController.get('model')
      expect(@subject.usersController._path(model, 'edit')).toEqual('/users/1/edit')
      expect(@subject.usersController._path('new')).toEqual('/users/new')