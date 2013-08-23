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
      attributes.push(attribute) if meta.isAttribute && @systemAttrs().indexOf(attribute) < 0
    @relations(modelType, attributes)
    attributes

  @relations: (modelType, attrs=[]) ->
    modelType.eachRelationship (attribute, meta) =>
      attrs.push(attribute)
    attrs

  @relationForType: (modelType, relation) ->
    type = undefined
    modelType.eachRelationship (attribute, meta) =>
      if meta.key == relation
        type = meta.type
    type

  @systemAttrs: ->
    ["created_at", "updated_at"]