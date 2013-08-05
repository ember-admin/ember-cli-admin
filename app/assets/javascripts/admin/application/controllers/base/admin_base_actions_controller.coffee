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

Admin.Base.Controllers.AdminBaseActionsController = Ember.Controller.extend

  actions: (->
    [ {title: "edit", class: "btn btn-small btn-primary", action: "edit", iconClass: "icon-pencil icon-white"},
      {title: "show", class: "btn btn-small btn-success", action: "show", iconClass: "icon-info-sign icon-white"},
      {title: "delete", confirm: "are you shure?", class: "btn btn-small btn-danger", action: "destroy", iconClass: "icon-trash icon-white"}
    ]
  ).property('')

  batchActions: (->
    [{title: "delete", confirm: "Are you sure?", action: "destroy"}]
  ).property('')

  new: () ->
    console.log "new"

  edit: (model) ->
    console.log "edit"

  destroy: (model) ->
    console.log "destroy"

  show: (model) ->
    console.log "show"
