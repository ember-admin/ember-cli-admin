`import PaginationMixin from '../routes/pagination';`
`import ModelMixin from '../routes/model';`
`import ControllerMixin from '../routes/controller';`
`import RenderMixin from '../routes/render';`
`import SetupControllerMixin from '../routes/setup-controller';`
`import ModalMixin from '../routes/modal';`

mainRouteMixin = Ember.Mixin.create()

mainRouteMixin.reopen(PaginationMixin,
  ModelMixin,
  ControllerMixin,
  SetupControllerMixin,
  RenderMixin,
  ModalMixin)

`export default mainRouteMixin;`