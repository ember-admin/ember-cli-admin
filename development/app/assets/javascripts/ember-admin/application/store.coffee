DS.RESTAdapter.reopen({
  namespace: 'admin'
})

Admin.Store = DS.Store.extend
  revision: 11
  adapter: DS.RESTAdapter.create()