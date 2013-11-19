describe "Admin.Base.Views.Table.TdView", ->
  beforeEach ->
    @subject = new TestEnv()
    runs ->
      model = @subject.store.find('user', 2).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model') != null

  it 'change value', ->
    runs ->
      @subject.view = Admin.Base.Views.Table.TdView.create(controller: @subject.usersController,
      context: @subject.usersController.get('model'), attributeName: 'name')
      expect(@subject.view.get('value')).toEqual('Piter')
      @subject.usersController.set('model.name', 'Piter updated')
      expect(@subject.view.get('value')).toEqual('Piter updated')

  it 'change relation value', ->
    runs ->
      @subject.view = Admin.Base.Views.Table.TdView.create(controller: @subject.usersController,
      context: @subject.usersController.get('model'), attributeName: 'address')
      @subject.view.trigger('didInsertElement')
    waitsFor ->
      @subject.usersController.get('model.address.title') == "address 2"
    runs ->
      expect(@subject.view.get('value')).toEqual('address 2')
      model = @subject.usersController.get('model')
      address = @subject.store.createRecord('address', title: "new")
      address.save()
      waitsFor ->
        address.get('isNew') == false
      runs ->
        model.set('address', address)
        expect(model.get('address.title')).toEqual('new')
        expect(@subject.view.get('value')).toEqual('new')

  it 'change asset value', ->
    runs ->
      @subject.view = Admin.Base.Views.Table.TdView.create(controller: @subject.usersController,
      context: @subject.usersController.get('model'), attributeName: 'avatar')
      @subject.view.trigger('didInsertElement')
    waitsFor ->
      @subject.usersController.get('model.avatar.thumb_url') == "/2"
    runs ->
      expect(@subject.view.get('value')).toEqual('/2')
      model = @subject.usersController.get('model')
      avatar = @subject.store.createRecord('avatar', thumb_url: "/new")
      avatar.save()
      waitsFor ->
        avatar.get('isNew') == false
      runs ->
        model.set('avatar', avatar)
        expect(model.get('avatar.thumb_url')).toEqual('/new')
        expect(@subject.view.get('value')).toEqual('/new')