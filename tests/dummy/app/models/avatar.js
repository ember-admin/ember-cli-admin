import Asset from 'ember-cli-admin/logics/asset';
import DS from 'ember-data';
var avatar;

avatar = Asset.extend({
  type: DS.attr('string', {
    defaultValue: "Avatar"
  })
});

export default avatar;
