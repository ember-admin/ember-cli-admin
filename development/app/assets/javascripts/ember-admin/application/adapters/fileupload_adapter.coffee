Admin.FileuploadAdapter = DS.RESTAdapter.extend

  createRecord: (store, type, record) ->
    url = this.buildURL(type.typeKey)
    adapter = this
    return new Ember.RSVP.Promise((resolve, reject) ->
      data = {}
      data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record, { includeId: true })
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