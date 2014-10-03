`import Ember from 'ember';`
`import BaseActionsMixin from '../controllers/base-actions';`
`import FileUploadMixin from '../controllers/fileupload';`
`import AttributesMixin from '../controllers/attributes';`
`import PaginationMixin from '../controllers/pagination';`
`import BatchActionsMixin from '../controllers/batch-actions';`
`import FormActionsMixin from '../controllers/form-actions';`
`import BaseDecorator from '../../decorators/base-decorator';`

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

