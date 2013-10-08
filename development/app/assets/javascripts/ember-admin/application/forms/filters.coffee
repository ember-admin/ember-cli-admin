Admin.Forms.Filters = Ember.Object.extend().reopenClass

  fileupload: (options, property) ->
    context = options.contexts[0]
    context.get("fileuploads") isnt `undefined` and context.get("fileuploads").getEach("name").indexOf(property) >= 0

  mapField: (options, property) ->
    context = options.contexts[0]
    exist = context.get("asGoogleMap") isnt `undefined` and context.get("asGoogleMap").indexOf(property) >= 0
    return exist if exist
    context.get("asYandexMap") isnt `undefined` and context.get("asYandexMap").indexOf(property) >= 0

  as: (options, property) ->
    type = options.contexts[0].get("model").constructor
    options.hash.as = "select"  if Admin.DSL.Attributes.relations(type).indexOf(property) >= 0

  map: (options, property) ->
    context = options.contexts[0]
    if context.get('asGoogleMap')
      Ember.Handlebars.helpers.view.call context, Admin.Base.Views.GmapView, options