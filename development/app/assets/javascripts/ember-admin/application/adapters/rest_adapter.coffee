#DS.RESTSerializer.reopen
#
#  serialize: (record, options) ->
#    options = options || {};
#
#    serialized = this.createSerializedForm()
#    id = undefined
#
#    if options.includeId
#      if id = Ember.get(record, 'id')
#        this._addId(serialized, record.constructor, id)
#
#    if options.includeType
#      this.addType(serialized, record.constructor);
#
#    this.addAttributes(serialized, record)
#    this.addRelationships(serialized, record)
#    return serialized