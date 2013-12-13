(function() {
  if (!this.Admin) {
    this.Admin = Ember.Namespace.create();
  }

  this.Admin.Resolver = Ember.DefaultResolver.extend({
    resolveController: function(parsedName) {
      this.useRouterNaming(parsedName);
      if (this._checkResourceController(parsedName.fullName)) {
        this._setNames(parsedName);
      }
      if (this.resolveOther(parsedName)) {
        return this.resolveOther(parsedName);
      } else {
        return window.Admin.ApplicationController;
      }
    },
    resolveRoute: function(parsedName) {
      this.useRouterNaming(parsedName);
      if (this.resolveOther(parsedName)) {
        return this.resolveOther(parsedName);
      } else {
        if (!this._checkRouteName(parsedName.fullName)) {
          return window.Admin.MainRoute;
        }
      }
    },
    resolveTemplate: function(parsedName) {
      var namespaceTemplate, resolvedTemplate;
      resolvedTemplate = this._super(parsedName);
      if (resolvedTemplate) {
        return resolvedTemplate;
      }
      namespaceTemplate = Ember.TEMPLATES["ember-admin/%@".fmt(parsedName.name)];
      if (namespaceTemplate) {
        return namespaceTemplate;
      }
      return Ember.TEMPLATES['not_found'];
    },
    _checkRouteName: function(name) {
      return 'route:application route:basic route:loading route:error'.w().indexOf(name) >= 0;
    },
    _checkResourceController: function(name) {
      return this._pattern().test(name);
    },
    _replaceForResource: function(name) {
      return name.replace(this._pattern(), '');
    },
    _setNames: function(parsedName) {
      parsedName.fullName = this._replaceForResource(parsedName.fullName);
      parsedName.fullNameWithoutType = this._replaceForResource(parsedName.fullNameWithoutType);
      return parsedName.name = this._replaceForResource(parsedName.name);
    },
    _pattern: function() {
      return /(Show)|(Edit)|(New)|(Page)/;
    }
  });

}).call(this);
