DS.ActiveModelAdapter.reopen({
  namespace: 'admin'
})

Admin.ApplicationAdapter = DS.ActiveModelAdapter;