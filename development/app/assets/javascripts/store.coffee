DS.RESTAdapter.reopen({
  namespace: 'admin'
})

DS.RESTAdapter.configure("plurals", {
  address: "addresses"
});

Admin.Store = DS.Store.extend
  revision: 11
  adapter: DS.RESTAdapter.create()