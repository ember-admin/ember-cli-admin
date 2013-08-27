DS.RESTAdapter.reopen({
  namespace: 'admin'
})

DS.RESTAdapter.configure("plurals", {
  address: "addresses"
});

Admin.Store = DS.Store.extend
  revision: 13
  adapter: DS.RESTAdapter.create()

Admin.Store.registerAdapter('Admin.Avatar', Admin.Adapters.FileuploadAdapter.extend())
Admin.Store.registerAdapter('Admin.CarImage', Admin.Adapters.FileuploadAdapter.extend())