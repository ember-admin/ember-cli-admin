class Admin.DSL.Attributes

  @detect: (modelType) ->
    attributes = ["id"]
    modelType.eachComputedProperty (attribute, meta) =>
      attributes.push(attribute) if meta.isAttribute
    attributes

  @singularize: (name) ->
    if name.lastIndexOf('s') == name.length - 1
      name.substring(0, name.length - 1)
    else
      name

  @pluralize: (name) ->
    name + "s"