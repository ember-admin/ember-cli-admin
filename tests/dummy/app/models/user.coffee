`import DS from 'ember-data'`

user = DS.Model.extend
  email:                      DS.attr('string')
  name:                       DS.attr('string')
#  address:                    DS.belongsTo('address')
  updated_at:                 DS.attr('string')
  created_at:                 DS.attr('string')
  lat:                        DS.attr('number')
  long:                       DS.attr('number')
  zoom:                       DS.attr('number')
  avatar:                     DS.belongsTo('avatar')
  avatars:                    DS.hasMany('avatar', {async: true})

  fileuploads: ["avatar", "avatars"]

  asGoogleMap: ['lat', 'long', 'zoom']

  formFields: ['email', 'name']


`export default user`