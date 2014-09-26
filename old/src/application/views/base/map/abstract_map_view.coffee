Admin.Base.Views.AbstractMapView = Ember.View.extend
  templateName: "base/_geo"

  lan: (->
    @get("context.#{@get('lanAttr')}")
  ).property()

  setLan: (value) ->
    @get('context').set(@get('lanAttr'), value)

  lanAttr:(->
    @get("context.#{@get('mapType')}")[0]
  ).property()

  lng:(->
    @get("context.#{@get('lngAttr')}")
  ).property()

  lngAttr:(->
    @get("context.#{@get('mapType')}")[1]
  ).property()

  setLng: (value) ->
    @get('context').set(@get('lngAttr'), value)

  zoom:(->
    @get("context.#{@get('zoomAttr')}") || 8
  ).property()

  zoomAttr: (->
    @get("context.#{@get('mapType')}")[2]
  ).property()

  setZoom: (value) ->
    @get('context').set(@get('zoomAttr'), value)

  centerCoords: ->
    if @get('lan') && @get('lng')
      [@get('lan'), @get('lng')]
    else
      Admin.Logics.Config.get('mapCenter').split(",")

  setAttrs: (pos) ->
    if pos['push']
      @setLan(pos[0])
      @setLng(pos[1])
    else
      @setLan(pos.ob)
      @setLng(pos.pb)