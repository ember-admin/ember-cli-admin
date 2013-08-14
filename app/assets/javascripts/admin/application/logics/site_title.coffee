Admin.Logics.SiteTile = Ember.Object.extend()

Admin.Logics.SiteTile.reopenClass
  setup: (controllerName, model, action) ->
    if action
      document.title = "%@ - %@ - %@".fmt(controllerName, model.get('id'), action)
    else
      document.title = "%@ - list".fmt(controllerName)