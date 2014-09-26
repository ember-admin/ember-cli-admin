Ember.Handlebars.registerHelper "input-map", (property, options) ->
  options = Ember.EasyForm.processOptions(property, options)
  options.hash.property = property
  options.hash.isBlock = !!(options.fn)
  return Ember.Handlebars.helpers.view.call(@get('model'), Admin.Base.Views.GmapView, options) if @get('model.asGoogleMap')
  return Ember.Handlebars.helpers.view.call(@get('model'), Admin.Base.Views.YandexMapView, options) if @get('model.asYandexMap')