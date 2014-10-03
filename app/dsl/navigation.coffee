###
  This file create navigation menu in top

  @navigate
  @params:
    @title - string
    @options - hash
    @nestedMenu - function

  If you want use another main controller, you must set route param to ""
  for example:
    @navigate "MyDashboard", route: ""

  When you want use Menu group:

    @navigate "Users", ->
      @navigate "Admins"
      @navigate "Managers"

  You can change url for menu when pass url params
      @navigate "Dashboard", url: "/my_dashboard", route: "my_dashboard"

params:
  url
  route
  divider true|false   -> default false

###
#Admin.DSL.Navigation.namespace = "admin"

###
  for testing
    @navigate "System", ->
      @navigate "Users"
      @navigate "Settings", divider: true
###
`import Ember from 'ember';`

navigationClass = class Navigation
  @content: []

  constructor: (container, @parentId) ->
    @container = (container || [])

  @map: (callback) ->
    navigation = new navigationClass()
    callback.call(navigation)
    @content = navigation.container

  navigate: (title, options, callback) ->
    navigateObject =  {title: title, children: [], divider: false, id: @_uid()}
    navigateObject.parentId = @parentId if @parentId
    if options && typeof options != 'function'
      navigateObject = $.extend(navigateObject, options)

    @_makeRoute(navigateObject)
    emberObject = Ember.Object.create(navigateObject)
    @container.push(emberObject)

    if typeof options == 'function'
      callback = options

    if callback
      emberObject.set('hasChildren', true)
      callback.call(new navigationClass(emberObject.get('children'), emberObject.get('id')))
    @container

  _makeRoute: (options={}) ->
    if options.route == undefined
      options.route = options.title.underscore()

  _uid: ->
    Math.random().toString(36).substr(2,9)

  @findParent: (obj) ->
    @content.find (item) => item.id == obj.parentId

`export default navigationClass;`