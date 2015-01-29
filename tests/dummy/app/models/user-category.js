import DS from 'ember-data';
var userCategory;

userCategory = DS.Model.extend({
  name: DS.attr('string'),
  zip_code: DS.attr('number'),
  description: DS.attr('string'),
  expired_at: DS.attr('date'),
  is_created: DS.attr('boolean'),
  email: DS.attr('string'),
  color: DS.attr('string')

});

export default userCategory;
