`import FileuploadAdapterMixin from 'emberadmin/mixins/fileupload-adapter'`
`import ApplicationAdapter from './application'`

avatar = ApplicationAdapter.extend(FileuploadAdapterMixin, {
});

`export default avatar;`