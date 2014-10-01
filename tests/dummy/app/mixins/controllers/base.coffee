`import Ember from 'ember';`
`import BaseActionsMixin from 'dummy/mixins/controllers/base-actions';`
`import FileUploadMixin from 'dummy/mixins/controllers/fileupload';`
`import AttributesMixin from 'dummy/mixins/controllers/attributes';`
`import PaginationMixin from 'dummy/mixins/controllers/pagination';`
`import BatchActionsMixin from 'dummy/mixins/controllers/batch-actions';`
`import FormActionsMixin from 'dummy/mixins/controllers/form-actions';`
`import BaseDecorator from 'dummy/decorators/base-decorator';`

baseMixin = Ember.Mixin.create

  decorator: (->
    BaseDecorator.create(model: @get('model')) if @get('model')
  ).property('model')

  _name: (->
    @_debugContainerKey.split(":")[1].replace(/(\/[Ss]how)|(\/[Ee]dit)|(\/[Nn]ew)/, '')
  ).property()

baseMixin.reopen(
  BaseActionsMixin,
  FileUploadMixin,
  AttributesMixin,
  PaginationMixin,
  BatchActionsMixin,
  FormActionsMixin,
)

`export default baseMixin;`

