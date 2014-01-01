window.Admin = Ember.Namespace.create() unless window.Admin

#dsl
window.Admin.DSL = Ember.Namespace.create()

#logic
window.Admin.Logics = Ember.Namespace.create()

#base
window.Admin.Base = Ember.Namespace.create()

window.Admin.Base.Controllers = Ember.Namespace.create()
window.Admin.Base.Views = Ember.Namespace.create()

#views
window.Admin.Base.Views.Table = Ember.Namespace.create()

#mixins
window.Admin.Mixins = Ember.Namespace.create()
window.Admin.Mixins.Controllers = Ember.Namespace.create()
window.Admin.Mixins.Routes = Ember.Namespace.create()

#fileuploads
window.Admin.Fileupload  = Ember.Namespace.create()

window.Admin.Adapters = Ember.Namespace.create()

#forms
window.Admin.Forms = Ember.Namespace.create()