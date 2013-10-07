DS.ActiveModelAdapter.reopen({
  namespace: 'admin'
})

#setup base adapter
Admin.ApplicationAdapter = DS.ActiveModelAdapter.extend()