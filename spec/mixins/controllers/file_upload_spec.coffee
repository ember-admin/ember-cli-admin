describe 'Admin.Base.Mixins.FileUploadMixin', ->
  beforeEach ->
    @subject = new TestEnv()
    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model.id') != null

  describe 'createAsset', ->
    it 'belongsTo', ->
      runs ->
        view = Admin.Fileupload.DragAndDropZoneView.create({context: {model: @subject.usersController.get('model.avatar')}, single: true})
        view.clearInput = ->
        expect(view.get('context.model')).toBeDefined()
        file = "test file"
        @subject._asset =  @subject.store.createRecord('avatar', {type: 'avatar'})
        runs ->
          @subject.usersController.send('createAsset',  @subject._asset, 'avatar', view)
          waitsFor ->
            @subject.usersController.get('model.avatar.id')!= null
          runs ->
            expect(@subject.usersController.get('model.avatar.id')).toEqual(@subject._asset.get('id'))

    it 'hasMany', ->
      runs ->
        view = Admin.Fileupload.DragAndDropZoneView.create({context: {model: @subject.usersController.get('model.avatar')}, single: false})
        view.clearInput = ->
        @subject._asset =  @subject.store.createRecord('avatar', {type: 'avatar'})
        runs ->
          @subject.usersController.send('createAsset',  @subject._asset, 'avatars', view)
          waitsFor ->
            @subject.usersController.get('model.avatars').toArray().length != 0
          runs ->
            expect(@subject.usersController.get('model.avatars').toArray().length).toEqual(1)