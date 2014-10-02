`import PaginationMixin from 'dummy/mixins/routes/pagination';`
`import ModelMixin from 'dummy/mixins/routes/model';`
`import ControllerMixin from 'dummy/mixins/routes/controller';`
`import RenderMixin from 'dummy/mixins/routes/render';`
`import SetupControllerMixin from 'dummy/mixins/routes/setup-controller';`
`import ModalMixin from 'dummy/mixins/routes/modal';`

mainRouteMixin = Ember.Mixin.create()

mainRouteMixin.reopen(PaginationMixin,
  ModelMixin,
  ControllerMixin,
  SetupControllerMixin,
  RenderMixin,
  ModalMixin)

`export default mainRouteMixin;`