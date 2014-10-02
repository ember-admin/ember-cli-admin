`import BaseControllerMixin from 'dummy/mixins/controllers/base';`

tableViewMixin = Ember.Mixin.create
  __table: true

tableViewMixin.reopen(BaseControllerMixin)

`export default tableViewMixin;`