Admin.Maps.GoogleMap = Ember.Mixin.create Admin.Maps.AbstractMapMixin,

  scrollwheel: false

  mapTypeId:(->
    if goodle
      google.maps.MapTypeId.ROADMAP
  ).property()

  center: (->
    new google.maps.LatLng(@get('lat'), @get('lng'))
  ).property('lat', 'lng')