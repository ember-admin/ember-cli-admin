Admin.Base.Controllers.AdminBaseController = Ember.ObjectController.extend Admin.Mixins.Controllers.BaseActionsMixin,
  Admin.Mixins.Controllers.FileUploadMixin,
  Admin.Mixins.Controllers.AttributesMixin,
  Admin.Mixins.Controllers.PaginationMixin,
  Admin.Mixins.Controllers.BatchActionsMixin,
  Admin.Mixins.Controllers.FormActionsMixin,

  decorator: (->
    Admin.BaseDecorator.create(model: @get('model')) if @get('model')
  ).property('model')