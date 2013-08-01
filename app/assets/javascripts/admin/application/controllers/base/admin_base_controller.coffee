###
  This is base controller for use in all views
  If you wont add you action please override this actions
  Or you can use additionalActions property!
  for example:
   In your controller
    additionalActions:(->
      [{title: "my action", class: "btn my-action-css", action: "my"}]
    ).property()
###
Admin.BaseController = Ember.ArrayController.extend
  actions: (->
    [{title: "create", class: "btn btn-small btn-success", action: "create"},
     {title: "edit", class: "btn btn-small btn-primary", action: "edit"},
     {title: "delete", class: "btn btn-small btn-danger", action: "delete"}
    ]
  ).property('')