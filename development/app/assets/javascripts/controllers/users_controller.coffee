Admin.UsersController = Admin.Base.Controllers.AdminBaseTableController.extend
  additionalActions: [
    {
      title: "clone",
      "class": "btn btn-small btn-warning",
      action: "clone",
      iconClass: "icon-plus icon-white",
      confirm: "Are you sure clone this???"
    }
  ]

  clone: (model) ->
    console.log("clone")