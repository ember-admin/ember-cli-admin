import DS from 'ember-data';
import Ember from 'ember';
var catalogue;

catalogue = DS.Model.extend({
  name: DS.attr('string'),
  parent_id: DS.attr('number'),
  catalogues: DS.hasMany('catalogue', {
    async: true,
    inverse: null
  }),
  children: Ember.computed.alias('catalogues'),
  rebuildUrl: '/api/catalogues'
});

export default catalogue;