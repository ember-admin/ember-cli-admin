class Admin.DSL.Attributes

  @detect: (modelType) ->
    @withId(modelType)

  @withId: (modelType) ->
    attrs = @withoutId(modelType)
    attrs.unshift("id")
    attrs

  @withoutId: (modelType)->
    attributes = []
    modelType.eachComputedProperty (attribute, meta) =>
      attributes.push(attribute) if meta.isAttribute
    @relations(modelType, attributes)
    attributes

  @relations: (modelType, attrs=[]) ->
    modelType.eachRelationship (attribute, meta) =>
      attrs.push(attribute)
    attrs

  @singularize: (name) ->
    if name.lastIndexOf('s') == name.length - 1
      name.substring(0, name.length - 1)
    else
      name

  @pluralize: (name) ->
    name + "s"

  @relationForType: (modelType, relation) ->
    type = undefined
    modelType.eachRelationship (attribute, meta) =>
      if meta.key == relation
        type = meta.type
    type