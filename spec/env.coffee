class @TestEnv
  constructor: (mixin, controller=undefined) ->

    env = {}
    if controller
      usersController = controller.extend()
    else
      usersController = Ember.ObjectController.extend(mixin)
    env.container = container = new Ember.Container()
    container.register('controller:application', {})
    container.register('controller:test', {})
    env.usersController = usersController.create({ container: container })
    env.usersController._debugContainerKey = "controller:users"

    @models()
    @routes()
    @fixtures()

    @setupStore({user: User}, env)
    return env

  setupStore: (options, env) ->
    options = options or {}
    container = env.container = new Ember.Container()
    adapter = env.adapter = DS.FixtureAdapter.extend()

    for prop of options
      container.register "model:" + prop, options[prop]
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

  models: ->
    window.User = DS.Model.extend
      name: DS.attr('string')
      email: DS.attr('string')

  fixtures: ->
    User.FIXTURES = [{
      id: '1',
      name: "Jon",
      email: "jon@ember-admin.com",
    },
    {
      id: '2',
      name: "Piter",
      lastName: "piter@ember-admin.com",
    }]

  routes: ->
    Admin.Router.map () ->
      @route "dashboard", path: "/"

    Admin.MetaRoute.map () ->
      @resources 'users', path: '/users'