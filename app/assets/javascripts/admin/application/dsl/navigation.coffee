class Admin.DSL.Navigation
  @content: []

  constructor: (container) ->
    @container = (container || [])

  @map: (callback) ->
    @content = callback.call(new Admin.DSL.Navigation())

  navigate: (title, options, callback) ->
    navigateObject =  {title: title, children: [], divider: false}
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
      callback.call(new Admin.DSL.Navigation(emberObject.get('children')))
    @container

  _makeRoute: (options={}) ->
    if options.route == undefined
      options.route = options.title.underscore()

  _makeUrl: (options={}) ->
    options.url = "#/%@".fmt(options.route) unless options.url