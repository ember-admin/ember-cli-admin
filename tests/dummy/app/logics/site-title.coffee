`import Ember from 'ember';`

siteTitle = Ember.Object.extend()

siteTitle.reopenClass
  setup: (controllerName, model, action) ->
    if action
      if model.get('id')
        document.title = "%@ - %@ - %@".fmt(controllerName, model.get('id'), action)
      else
        document.title = "%@ - %@".fmt(controllerName, action)
    else
      document.title = "%@ - list".fmt(controllerName)

`export default siteTitle;`