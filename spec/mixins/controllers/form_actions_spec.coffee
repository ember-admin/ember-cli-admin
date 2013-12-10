describe 'Admin.Mixins.Controllers.FormActionsMixin', ->
  beforeEach ->
    @subject = new TestEnv()
    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model.id') != null

  describe 'submit', ->
    it 'update', ->
      runs ->
        model =  @subject.usersController.get('model')
        model.set('name', 'test')
        expect(model.get('isDirty')).toBe true
        runs ->
          model.save()
          waitsFor ->
            model.get('isDirty') == false
          runs ->
            expect(model.get('isDirty')).toBe false
            expect(model.get('name')).toEqual('test')