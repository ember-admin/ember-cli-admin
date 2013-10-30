class @TestEnv
  constructor: (mixin) ->

    if mixin
      Admin.UserController = Ember.ObjectController.extend(mixin)
    else
      Admin.UserController = Admin.ApplicationController.extend()

    container = Admin.__container__

    Admin.ApplicationAdapter = DS.FixtureAdapter.extend(
      queryFixtures: (fixtures, query, type) ->
        fixtures
    )

    env = {}
    env.store = container.lookup("store:main")
    env.usersController = Admin.UserController.create({ container: container })
    env.usersController._debugContainerKey = "controller:users"

    @models()
    @routes()
    @fixtures()

    return env

  models: ->
    Admin.User = DS.Model.extend
      name: DS.attr('string')
      email: DS.attr('string')

  fixtures: ->
    Admin.User.FIXTURES = [{
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