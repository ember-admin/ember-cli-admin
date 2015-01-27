import DS from 'ember-data';
var user;

user = DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  nickname: DS.attr('string'),
  updated_at: DS.attr('string'),
  created_at: DS.attr('string'),
  birthdate: DS.attr('date'),
  lat: DS.attr('number'),
  long: DS.attr('number'),
  zoom: DS.attr('number'),
  is_active: DS.attr('boolean', {
    defaultValue: false
  }),
  avatar: DS.belongsTo('avatar'),
  avatars: DS.hasMany('avatar', {
    async: true
  }),
  fileuploads: ["avatar", "avatars"],
  asGoogleMap: ['lat', 'long', 'zoom'],
  additionalActions: (function() {
    var actions;
    actions = [];
    if (this.get('is_active')) {
      actions.pushObject({
        title: "Toggle Active",
        "class": "btn btn-small btn-warning",
        action: "toggleActive",
        iconClass: "glyphicon glyphicon-remove"
      });
    } else {
      actions.pushObject({
        title: "Toggle Active",
        "class": "btn btn-small btn-green",
        action: "toggleActive",
        iconClass: "glyphicon glyphicon-ok"
      });
    }
    return actions;
  }).property('is_active')
});

export default user;