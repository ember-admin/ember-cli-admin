`import Ember from 'ember';`
`import Attributes from 'emberadmin/dsl/attributes';`

attributesMixin =  Ember.Mixin.create

  formAttributes:(->
    attrs = (@get('model.formFields') || Attributes.withoutId(@get("model").constructor))
    attrs.map (attr) -> { name: attr }
  ).property('modelAttributes.@each')

  tableAttributes:(->
    @get('modelAttributes')
  ).property('modelAttributes.@each')

  fileuploads:(->
    if @get('model.fileuploads')
      @get('model.fileuploads').map (attr) -> { name: attr }
  ).property('model.fileuploads')

`export default attributesMixin;`