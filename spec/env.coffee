class @TestEnv
  constructor: (mixin) ->

    Admin.UsersController = Admin.ApplicationController.extend()

    env = {}
    Admin.ApplicationAdapter = DS.FixtureAdapter.extend()
    env = @_setupEnv()
    @models()
    @fixtures()
    @_regModels(env, {user: User, avatar: Avatar})

    env.usersController = Admin.UsersController.create({ container: env.container, store:  env.store, __model_name: "user", __controller_name: "users"})
    env.usersController._debugContainerKey = "controller:users"


    #    @routes()

    return env

  models: ->
    window.User = DS.Model.extend
      name: DS.attr('string')
      email: DS.attr('string')
      avatar: DS.belongsTo('avatar')
      avatars: DS.hasMany('avatar', {asnc: true})

      fileuploads: ['avatar', 'avatars']

    window.Avatar = Admin.Asset.extend(
      type: DS.attr('string', {defaultValue: "Avatar"})
    )

    #Admin.AvatarAdapter = DS.FixtureAdapter.extend()

  fixtures: ->
    window.User.FIXTURES = [{
      id: '1',
      name: "Jon",
      email: "jon@ember-admin.com"
    },
    {
      id: '2',
      name: "Piter",
      lastName: "piter@ember-admin.com",
      avatar: 2,
      avatars: []
    }]

    window.Avatar.FIXTURES = [{
      id: 1,
      type: 'Avatar',
      assetable_id: 1
      assetable_type: 'User'
    },
    {
      id: 2,
      type: 'Avatar',
      assetable_id: 2
      assetable_type: 'User'
    }]

  routes: ->
    Admin.Router.map () ->
      @route "dashboard", path: "/"

    Admin.MetaRoute.map () ->
      @resources 'users', path: '/users'


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