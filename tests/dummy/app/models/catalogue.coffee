`import DS from 'ember-data'`
`import Ember from 'ember'`

catalogue = DS.Model.extend
  name: DS.attr('string')
  parent: DS.belongsTo('catalogue', inverse: null)
  lft: DS.attr('number')
  rgt: DS.attr('number')
  depth: DS.attr('number')
  ###
    it's not for show
  ###
  prevId: DS.attr('number')
  nextId: DS.attr('number')

  catalogues: DS.hasMany('catalogue', {async: true, inverse: null})

  children: Ember.computed.alias('catalogues')

`export default catalogue`