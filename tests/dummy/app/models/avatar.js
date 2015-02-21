import Asset from 'ember-cli-admin/logics/asset';
import DS from 'ember-data';
var avatar;

avatar = Asset.extend({
    type: DS.attr('string', {
        defaultValue: "Avatar"
    }),
    position: DS.attr('number'),
    content_type: DS.attr('string', {
        defaultValue: "image/jpeg"
    }),
    original_filename: DS.attr('string', {
        defaultValue: "Title"
    }),
});

export default avatar;
