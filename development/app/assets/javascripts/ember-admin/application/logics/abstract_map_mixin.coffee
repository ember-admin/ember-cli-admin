Admin.Maps.AbstractMapMixin = Ember.Mixin.create
  lat: -34.397
  lng: 150.644
  zoom: 8

  elementId: 'map-canvas'

  loadScript: ->
    Ember.K