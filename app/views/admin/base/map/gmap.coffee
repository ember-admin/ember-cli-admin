`import AbstractMapView from '../map/abstract-map'`

gmapView = AbstractMapView.extend

  templateName: "admin/base/_geo"

  mapType: 'asGoogleMap'

  initialize:(->
    options =
      zoom: @get('zoom')
      center: @get('center'),
      mapTypeId: @get('mapTypeId')

    map    = new google.maps.Map(@$().find(".map")[0], options)
    marker = @initMarker(map)

    @initAutocomplete(map, marker)

    google.maps.event.addListener map, 'zoom_changed', =>
      @setZoom(map.getZoom())
  ).on('didInsertElement')

  center: (->
    coord = @centerCoords()
    new google.maps.LatLng(coord[0], coord[1])
  ).property()

  mapTypeId:(->
    google.maps.MapTypeId.ROADMAP
  ).property()

  initMarker: (map) ->
    options =
      position: @get('center'),
      map: map,
      draggable: true

    marker = new google.maps.Marker(options)

    google.maps.event.addListener marker, 'dragend', (event) =>
      map.setCenter(event.latLng)
      pos = marker.getPosition()
      @setAttrs(pos)
    marker

  initAutocomplete: (map, marker) ->
    autocompleteView = @get('MapAutocomplete')
    input =  autocompleteView.$()[0]
    autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']})
    google.maps.event.addListener autocomplete, 'place_changed', =>
      place = autocomplete.getPlace()
      return unless place.geometry
      pos = place.geometry.location
      if place.geometry.viewport
        map.fitBounds(place.geometry.viewport)
      else
        map.setCenter(pos)
        map.setZoom(17)

      marker.setPosition(pos)
      @setAttrs(pos)

`export default gmapView`