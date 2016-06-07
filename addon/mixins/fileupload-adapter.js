import Ember from 'ember';

const {
  Mixin,
  RSVP,
  Inflector,
  $,
  isEmpty,
  merge,
  run
} = Ember;

export default Mixin.create({
  createRecord: function(store, type, snapshot) {
    let url;
    url = this.buildURL(type.modelName, null, snapshot, 'createRecord');
    return new RSVP.Promise((resolve, reject) => {
      let data, str;
      data = {};
      store.serializerFor(type.modelName).serializeIntoHash(data, type, snapshot, {
        includeId: true
      });
      const serializedType = Inflector.inflector.singularize(this.pathForType(type.modelName));
      if (snapshot["_excludeParams"]) {
        str = $.param(snapshot._excludeParams(data[serializedType]));
      } else {
        str = $.param(data[serializedType]);
      }
      url = `${url}?${str}`;
      data.context = this;

      const ajaxOptions = this.ajaxOptions();
      let params = {
        'data': snapshot.record.get('file'),
        'type': 'POST',
        'processData': false,
        'contentType': snapshot.attr('content_type')
      };

      if (!isEmpty(ajaxOptions)) {
        params = merge(ajaxOptions, params);
      }

      return $.ajax(url, params).then(function(data){
        run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null;
        run(null, reject, jqXHR);
      });
    });
  }
});
