`import Ember from 'ember';`

fileuploadAdapter = Ember.Mixin.create({

  createRecord: (store, type, record) ->
    url = this.buildURL(type.typeKey)
    adapter = this
    return new Ember.RSVP.Promise((resolve, reject) ->
      data = {}
      data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record, { includeId: true })
      if record["_excludeParams"]
        str =  $.param(record._excludeParams(data[type.typeKey]))
      else
        str =  $.param(data[type.typeKey])
      url = "%@?%@".fmt(url,str)
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
})

`export default fileuploadAdapter;`