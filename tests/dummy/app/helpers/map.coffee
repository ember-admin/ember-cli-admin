`import Ember from 'ember';`
`import GmapView from 'dummy/views/base/map/gmap';`
`import YandexMapView from 'dummy/views/base/map/yandex-map';`

inputMap = Ember.Handlebars.registerHelper "input-map", (property, options) ->
  options = Ember.EasyForm.processOptions(property, options)
  options.hash.property = property
  options.hash.isBlock = !!(options.fn)
  return Ember.Handlebars.helpers.view.call(@get('model'), GmapView, options) if @get('model.asGoogleMap')
  return Ember.Handlebars.helpers.view.call(@get('model'), YandexMapView, options) if @get('model.asYandexMap')

`export default inputMap;`