class @NavigationDsl

  constructor: (container) ->
    if container
      @container = container.children = {}
    else
      @container = {}

  @map: (callback) ->
    callback.call(new NavigationDsl())

  navigate: (name, options, callback) ->
    if options && typeof options != 'function'
      @container[name] = options
    else
      @container[name] = {}

    if typeof options == 'function'
      callback = options

    if callback
      callback.call(new NavigationDsl(@container[name]))
    @container