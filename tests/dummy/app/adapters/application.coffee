`import DS from 'ember-data';`

adapter = DS.ActiveModelAdapter.extend({
  namespace: 'api'
});

`export default adapter;`