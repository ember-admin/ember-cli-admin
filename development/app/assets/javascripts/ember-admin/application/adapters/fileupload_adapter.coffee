Admin.Adapters.FileuploadAdapter = DS.RESTAdapter.extend

  createRecord: (store, type, record) ->
    root = this.rootForType(type)
    adapter = this
    data = {}

    json = this.serialize(record, { includeId: true })
    url =  this.buildURL(root)
    url = "%@?%@".fmt(url, $.param(@_excludeParams(json)))
    request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', record.get('content_type'))
    request.onreadystatechange =  =>
      if request.readyState == 4 && (request.status == 201 || request.status == 200)
        data = JSON.parse(request.response)
        adapter.didCreateRecord(store, type, record, data)
    request.send(record.get('file'))

  _excludeParams: (obj) ->
    ["url", "thumb_url"].forEach (param) ->
      delete obj[param]
    obj