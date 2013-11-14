class Admin.DSL.Navigation
  @content: []

  constructor: (container, @parentId) ->
    @container = (container || [])

  @map: (callback) ->
    @content = callback.call(new Admin.DSL.Navigation())

  navigate: (title, options, callback) ->
    navigateObject =  {title: title, children: [], divider: false, id: @_uid()}
    navigateObject.parentId = @parentId if @parentId
    if options && typeof options != 'function'
      navigateObject = $.extend(navigateObject, options)

    @_makeRoute(navigateObject)
    @_makeUrl(navigateObject)
    emberObject = Ember.Object.create(navigateObject)
    @container.push(emberObject)

    if typeof options == 'function'
      callback = options

    if callback
      emberObject.set('hasChildren', true)
      callback.call(new Admin.DSL.Navigation(emberObject.get('children'), emberObject.get('id')))
    @container

  _makeRoute: (options={}) ->
    if options.route == undefined
      options.route = options.title.underscore()

  _makeUrl: (options={}) ->
    options.url = "#/%@".fmt(options.route) unless options.url

  _uid: ->
    Math.random().toString(36).substr(2,9)

  @findParent: (obj) ->
    @content.find (item) => item.id == obj.parentId