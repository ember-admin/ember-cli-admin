import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  parent_id: DS.attr('number'),

  <%= camelizedModuleName %>: DS.hasMany('<%= modelName %>', {async: true, inverse: null}),

  children: Ember.computed.alias('<%= camelizedModuleName %>'),

  rebuildUrl: function(){
     return '/api/v1/<%= camelizedModuleName %>';
  }.property()

});