`import DS from 'ember-data'`

user = DS.Model.extend
  email:                      DS.attr('string')
  name:                       DS.attr('string')
  nickname:                   DS.attr('string')
  updated_at:                 DS.attr('string')
  created_at:                 DS.attr('string')
  lat:                        DS.attr('number')
  long:                       DS.attr('number')
  zoom:                       DS.attr('number')
  avatar:                     DS.belongsTo('avatar')
  avatars:                    DS.hasMany('avatar', {async: true})

  fileuploads: ["avatar", "avatars"]

  asGoogleMap: ['lat', 'long', 'zoom']

`export default user`