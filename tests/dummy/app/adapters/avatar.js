import FileuploadAdapterMixin from 'ember-cli-admin/mixins/fileupload-adapter';
import ApplicationAdapter from './application';
var avatar;

avatar = ApplicationAdapter.extend(FileuploadAdapterMixin, {});

export default avatar;