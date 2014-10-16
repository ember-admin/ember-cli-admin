`import FileuploadAdapterMixin from 'ember-cli-admin/mixins/fileupload-adapter'`
`import ApplicationAdapter from './application'`

avatar = ApplicationAdapter.extend(FileuploadAdapterMixin, {
});

`export default avatar;`