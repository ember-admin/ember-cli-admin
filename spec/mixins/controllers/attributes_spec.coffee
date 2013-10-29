describe 'Admin.Base.Mixins.AttributesMixin', ->
  beforeEach ->

    @subject = new TestEnv(Admin.Base.Mixins.AttributesMixin)

    runs ->
      model = @subject.store.find('user', 1).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model') != null

  it 'returns formAttributes', ->
    runs ->
      expect(@subject.usersController.get('formAttributes')).toEqual([{ name: 'name'}, {name: 'email'}])

  it 'tableAttributes', ->
    runs ->
      @subject.usersController.set('modelAttributes', Admin.DSL.Attributes.detect(@subject.usersController.get('model').constructor))
      expect(@subject.usersController.get('tableAttributes')).toEqual([ 'id', 'name', 'email' ])

  it 'fileuploads', ->
    runs ->
      expect(@subject.usersController.get('fileuploads')).toBeUndefined()
      @subject.usersController.get('model').set('fileuploads', ['avatar'])
      expect(@subject.usersController.get('fileuploads')).toEqual([{ name : 'avatar' } ])