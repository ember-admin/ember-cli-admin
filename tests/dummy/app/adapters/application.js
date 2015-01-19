import DS from 'ember-data';
var adapter;

adapter = DS.ActiveModelAdapter.extend({
  namespace: 'api'
});

export default adapter;