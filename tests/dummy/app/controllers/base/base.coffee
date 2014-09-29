`import Ember from 'ember';`
`import BaseActionsMixin from 'dummy/mixins/controllers/base-actions';`
`import FileUploadMixin from 'dummy/mixins/controllers/fileupload';`
`import AttributesMixin from 'dummy/mixins/controllers/attributes';`
`import PaginationMixin from 'dummy/mixins/controllers/pagination';`
`import BatchActionsMixin from 'dummy/mixins/controllers/batch-actions';`
`import FormActionsMixin from 'dummy/mixins/controllers/form-actions';`
`import BaseDecorator from 'dummy/decorators/base-decorator';`

baseController = Ember.Controller.extend BaseActionsMixin,
  FileUploadMixin,
  AttributesMixin,
  PaginationMixin,
  BatchActionsMixin,
  FormActionsMixin,



  decorator: (->
    BaseDecorator.create(model: @get('model')) if @get('model')
  ).property('model')

`export default baseController;`