`import DS from 'ember-data'`
`import ApplicationAdapter from './application'`

adapter = DS.ActiveModelAdapter.extend({
  namespace: 'api'
});

`export default adapter;`