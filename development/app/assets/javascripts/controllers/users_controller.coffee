Admin.UsersController = Admin.Base.Controllers.AdminTableController.extend
  additionalActions: [
    {
      title: "clone",
      "class": "btn btn-small btn-warning",
      action: "clone",
      iconClass: "glyphicon glyphicon-plus",
      confirm: "Are you sure clone this???"
    }
  ]

  actions:

    clone: (model) ->
      console.log("clone")
