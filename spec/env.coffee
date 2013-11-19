class @TestEnv
  constructor: ->

    Admin.UsersController = Admin.ApplicationController.extend()

    env = {}
    Admin.ApplicationAdapter = DS.FixtureAdapter.extend()
    env = @_setupEnv()
    @models()
    @fixtures()
    @_regModels(env, {user: User, avatar: Avatar, address: Address})

    env.usersController = Admin.UsersController.create({ container: env.container, store:  env.store, __model_name: "user", __controller_name: "users"})
    env.usersController._debugContainerKey = "controller:users"

    return env

  models: ->
    window.User = DS.Model.extend
      name: DS.attr('string')
      email: DS.attr('string')
      avatar: DS.belongsTo('avatar')
      address: DS.belongsTo('address')
      avatars: DS.hasMany('avatar', {asnc: true})

      fileuploads: ['avatar', 'avatars']

    window.Avatar = Admin.Asset.extend(
      type: DS.attr('string', {defaultValue: "Avatar"})
      name: DS.attr('string')
      thumb_url: DS.attr('string')
    )

    window.Address = DS.Model.extend
      title: DS.attr('string')


  fixtures: ->
    window.User.FIXTURES = [{
      id: '1',
      name: "Jon",
      address: 1,
      email: "jon@ember-admin.com",
      avatars: []
    },
    {
      id: '2',
      name: "Piter",
      lastName: "piter@ember-admin.com",
      avatar: 2,
      address: 2,
      avatars: []
    }]

    window.Avatar.FIXTURES = [{
      id: 1,
      type: 'Avatar',
      assetable_id: 1,
      assetable_type: 'User',
      thumb_url: "/1"
    },
    {
      id: 2,
      type: 'Avatar',
      assetable_id: 2,
      assetable_type: 'User',
      thumb_url: "/2"
    }]

    window.Address.FIXTURES = [{
      id: 1,
      title: "address 1"
    },
    {
      id: 2,
      title: "address 2"
    }]

  _setupEnv: (options) ->
    adapter = DS.FixtureAdapter.extend(
      queryFixtures: (fixtures, query, type) ->
        fixtures
    )
    env = {}
    options = options or {}
    container = env.container = new Ember.Container()
    env.adapter = adapter

    delete options.adapter

    container.register "serializer:_default", DS.RESTSerializer
    container.register "store:main", DS.Store.extend(adapter: adapter)

    container.register 'transform:boolean', DS.BooleanTransform
    container.register 'transform:date', DS.DateTransform
    container.register 'transform:number', DS.NumberTransform
    container.register 'transform:string', DS.StringTransform

    container.injection "serializer", "store", "store:main"

    env.serializer = container.lookup("serializer:_default")
    env.restSerializer = container.lookup("serializer:_rest")
    env.store = container.lookup("store:main")
    env.adapter = env.store.get("defaultAdapter")
    env

  _regModels: (env, mappings) ->
    for prop of mappings
      env.container.register "model:" + prop, mappings[prop]