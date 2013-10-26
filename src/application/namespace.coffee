#dsl
@Admin.DSL = Ember.Namespace.create()
#logic
@Admin.Logics = Ember.Namespace.create()
#base
@Admin.Base = Ember.Namespace.create()

@Admin.Base.Controllers = Ember.Namespace.create()
@Admin.Base.Views = Ember.Namespace.create()

#views
@Admin.Base.Views.Table = Ember.Namespace.create()

#mixins
@Admin.Base.Mixins = Ember.Namespace.create()

#fileuploads
@Admin.Fileupload  = Ember.Namespace.create()

@Admin.Adapters = Ember.Namespace.create()

#forms
@Admin.Forms = Ember.Namespace.create()