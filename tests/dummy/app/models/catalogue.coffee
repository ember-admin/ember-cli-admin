`import DS from 'ember-data'`
`import Ember from 'ember'`

catalogue = DS.Model.extend
  name: DS.attr('string')
  parent_id: DS.attr('number')

  catalogues: DS.hasMany('catalogue', {async: true, inverse: null})

  children: Ember.computed.alias('catalogues')

`export default catalogue`