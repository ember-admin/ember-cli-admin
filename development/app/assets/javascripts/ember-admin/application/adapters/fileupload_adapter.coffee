Admin.AvatarAdapter = DS.RESTAdapter.extend

  createRecord: (store, type, record) ->
    adapter = this
    return new Ember.RSVP.Promise((resolve, reject) ->
      data = {}
      data[type.typeKey] = adapter.serializerFor(type.typeKey).serialize(record, { includeId: true })
      url = adapter.buildURL(type)
      url = "%@?%@".fmt(url, $.param(adapter._excludeParams(data[type.typeKey])))
      data.context = adapter
      request = new XMLHttpRequest()
      request.open('POST', url, true)
      request.setRequestHeader('Content-Type', record.get('content_type'))
      request.onreadystatechange =  =>
        if request.readyState == 4 && (request.status == 201 || request.status == 200)
          data = JSON.parse(request.response)
          Ember.run(null, resolve, data)
      request.send(record.get('file'))
    )


  _excludeParams: (obj) ->
    ["url", "thumb_url"].forEach (param) ->
      delete obj[param]
    obj