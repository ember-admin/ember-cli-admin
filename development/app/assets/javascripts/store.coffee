DS.RESTAdapter.reopen({
  namespace: 'admin'
})

Admin.ApplicationAdapter = DS.RESTAdapter;

#DS.RESTAdapter.configure("plurals", {
#  address: "addresses"
#});
#
#Admin.Store = DS.Store.extend
#  adapter: DS.RESTAdapter.create().reopen({namespace: 'admin'})

#Admin.Store.registerAdapter('Admin.Avatar', Admin.Adapters.FileuploadAdapter.extend())
#Admin.Store.registerAdapter('Admin.CarImage', Admin.Adapters.FileuploadAdapter.extend())