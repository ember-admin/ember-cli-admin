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
      attributes.push(attribute) if meta.isAttribute && @systemAttrs(modelType).indexOf(attribute) < 0
    @relations(modelType, attributes, false)
    attributes

  @relations: (modelType, attrs=[], hasMany=true) ->
    modelType.eachRelationship (attribute, meta) =>
      if hasMany
        attrs.push(attribute)
      else
        attrs.push(attribute) unless meta.kind == "hasMany"
    attrs

  @isBelongsTo: (modelType, property) ->
    _belongsTo = false
    modelType.eachRelationship (attribute, meta) =>
      if meta.key == property && meta.kind == "belongsTo"
        _belongsTo = true
    _belongsTo

  @relationForType: (modelType, relation) ->
    type = undefined
    modelType.eachRelationship (attribute, meta) =>
      if meta.key == relation
        type = meta.type
    type

  @systemAttrs: (modelType) ->
    ["created_at", "updated_at"]