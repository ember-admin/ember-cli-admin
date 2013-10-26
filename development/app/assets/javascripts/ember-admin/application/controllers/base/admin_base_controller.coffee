Admin.Base.Controllers.AdminBaseController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  Admin.Base.Mixins.FileUploadMixin,
  Admin.Base.Mixins.AttributesMixin,
  Admin.Base.Mixins.PaginationMixin,
  Admin.Base.Mixins.BatchActionsMixin,
  Admin.Base.Mixins.FormActionsMixin