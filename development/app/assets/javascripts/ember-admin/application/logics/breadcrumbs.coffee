Admin.Logics.Breadcrumbs = Ember.Object.extend()

Admin.Logics.Breadcrumbs.reopenClass
  setup: (action, controller, model, breadcrumbs_controller) ->
    content = []
    obj = Ember.Object.create({name: "dashboard", url: "/#/", class: "first", active: false})
    content.pushObject(obj)
    obj = Ember.Object.create({name: controller.get('__controller_name'), url: "/#/#{controller.get('__controller_name')}", class: "active", active: true})
    if action
      obj.set('class', "")
      obj.set('active', false)
      content.pushObject(obj)
      name = (model.get('id') || action)
      obj = Ember.Object.create({name: name, class: "active", active: true})
      content.pushObject(obj)
    else
      content.pushObject(obj)
    breadcrumbs_controller.set('content', content)