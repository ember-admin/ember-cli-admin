Admin.Base.Views.AbstractMapView = Ember.View.extend
  templateName: "base/_geo"

  lan: (->
    @get("context.#{@get('lanAttr')}")
  ).property()

  setLan: (value) ->
    @get('context').set(@get('lanAttr'), value)

  lanAttr:(->
    @get('context.asGoogleMap')[0]
  ).property()

  lng:(->
    @get("context.#{@get('lngAttr')}")
  ).property()

  lngAttr:(->
    @get('context.asGoogleMap')[1]
  ).property()

  setLng: (value) ->
    @get('context').set(@get('lngAttr'), value)

  zoom:(->
    @get("context.#{@get('zoomAttr')}") || 8
  ).property()

  zoomAttr: (->
    @get('context.asGoogleMap')[2]
  ).property()

  setZoom: (value) ->
    @get('context').set(@get('zoomAttr'), value)