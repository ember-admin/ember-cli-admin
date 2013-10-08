Admin.User = DS.Model.extend

  email: DS.attr('string')
  name: DS.attr('string')
  address: DS.belongsTo('address')
  updated_at: DS.attr('string')
  created_at: DS.attr('string')
  lan: DS.attr('number')
  lng: DS.attr('number')
  zoom: DS.attr('number')
  avatar: DS.belongsTo('avatar')
  avatars: DS.hasMany('avatar', {async: true})

  emails: (->
   [this.get('email')]
  ).property('email')

  fileuploads: ["avatar", "avatars"]

  asGoogleMap: ['lan', 'lng', 'zoom']

#  asYandexMap: ['lan', 'lng', 'zoom']


#lan - latitude
#lng - longitude