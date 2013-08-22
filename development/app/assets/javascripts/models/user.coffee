Admin.User = DS.Model.extend

  email: DS.attr('string')
  name: DS.attr('string')
  address: DS.belongsTo('Admin.Address')
  updated_at: DS.attr('string')
  created_at: DS.attr('string')

  formFields: (->
    ["email", "name", "address"]
  ).property()

  emails: (->
   [this.get('email')]
  ).property('email')