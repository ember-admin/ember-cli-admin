import DS from 'ember-data';
var userCategory;

userCategory = DS.Model.extend({
  name: DS.attr('string')
});

export default userCategory;
