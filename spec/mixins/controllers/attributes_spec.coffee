describe 'Admin.Base.Mixins.AttributesMixin', ->
  beforeEach ->

    @subject = new TestEnv()

    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model') != null

  it 'returns formAttributes', ->
    runs ->
      expect(@subject.usersController.get('formAttributes')).toEqual([{ name: 'name'}, {name: 'email'}, { name : 'avatar' }])

  it 'tableAttributes', ->
    runs ->
      @subject.usersController.set('modelAttributes', Admin.DSL.Attributes.detect(@subject.usersController.get('model').constructor))
      expect(@subject.usersController.get('tableAttributes')).toEqual([ 'id', 'name', 'email', 'avatar'])

  it 'fileuploads', ->
    runs ->
      @subject.usersController.get('model').set('fileuploads', ['avatar'])
      expect(@subject.usersController.get('fileuploads')).toEqual([{ name : 'avatar' } ])