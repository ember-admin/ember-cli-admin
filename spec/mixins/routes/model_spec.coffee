describe 'Admin.Mixins.Routes.ModelMixin', ->
  beforeEach ->
    @subject = new TestEnv()
    @subject.route = Admin.MainRoute.create(store: @subject.store)

  describe '_find_model', ->
    it 'new', ->
      model = @subject.route._find_model('user', {action: 'new'})
      expect(model.get('isNew')).toBeTruthy()

    it 'collection', ->
      pagination = undefined
      runs ->
        pagination = @subject.route._find_model('user', {})
      waitsFor ->
        pagination != undefined
      runs ->
        expect(pagination.toArray().length).toEqual(0)

      pagination = undefined
      @subject.route.action = "page"
      runs ->
        pagination = @subject.route._find_model('user', {id: 2})
      waitsFor ->
        pagination != undefined
      runs ->
        expect(pagination.toArray().length).toEqual(0)

    it 'item', ->
      item = undefined
      runs ->
        item = @subject.route._find_model('user', {id: 1})
      waitsFor ->
        item != undefined
      runs ->
        expect(item.toArray).toBeUndefined()

  it '_setModel', ->
    withoutModel = @subject.route._setModel(@subject.usersController)
    expect(withoutModel).toBeUndefined()
    @subject.route._setModel(@subject.usersController, {type: "user"})
    expect(@subject.usersController.get('model.__list')).toBeTruthy()
    @subject.route._setModel(@subject.usersController, {})
    expect(@subject.usersController.get('model.__list')).toBeUndefined()

  it '_modelName', ->
    expect(@subject.route._modelName("users.new")).toEqual('user')
    expect(@subject.route._modelName("users")).toEqual('user')