import Ember from 'ember';

export default Ember.Mixin.create({
  createRecord: function(store, type, record) {
    var adapter, url;
    url = this.buildURL(type.typeKey);
    adapter = this;
    return new Ember.RSVP.Promise(function(resolve) {
      var data, request, str;
      data = {};
      data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record, {
        includeId: true
      });
      if (record["_excludeParams"]) {
        str = Ember.$.param(record._excludeParams(data[type.typeKey]));
      } else {
        str = Ember.$.param(data[type.typeKey]);
      }
      url = "%@?%@".fmt(url, str);
      data.context = adapter;
      
      return Ember.$.ajax(url,{
        'data': record.get('file'), //{action:'x',params:['a','b','c']}
        'type': 'POST',
        'processData': false,
        'contentType': record.attr('content_type')
      }).then(function(data){
          data = JSON.parse(data);
          return Ember.run(null, resolve, data);
      });
    });
  }
});
