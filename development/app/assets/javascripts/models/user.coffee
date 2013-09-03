Admin.User = DS.Model.extend

  email: DS.attr('string')
  name: DS.attr('string')
  address: DS.belongsTo('address')
  updated_at: DS.attr('string')
  created_at: DS.attr('string')
  avatar: DS.belongsTo('avatar')
  avatars: DS.hasMany('avatar', {async: true})

  emails: (->
   [this.get('email')]
  ).property('email')

  fileuploads: ["avatar", "avatars"]