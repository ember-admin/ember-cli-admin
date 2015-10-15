import Ember from 'ember';
import Breadcrumbs from 'ember-cli-admin/logics/breadcrumbs';
import SiteTitle from 'ember-cli-admin/logics/site-title';

export default Ember.Mixin.create({
  getOutlet: function(controller, outletName) {
    var outlet = `${Ember.String.decamelize(this._controllerName(controller))}/${outletName}`;
    if (this._getRegistry().has(`template:${outlet}`)) {
      return outlet;
    }
    if (this._getRegistry().has(`template:admin/${outletName}`)) {
      return `admin/${outletName}`;
    }
    return `admin/${outletName}`;
  },

  _getRegistry() {
    if (this.container._registry) {
      return this.container._registry;
    }
    return this.container.registry;
  },

  _getControllerTemplate: function(controller) {
    var name;
    name = this._controllerName(controller);

    if (this._isLoading(name) || this._isError(name)) {
      if (this._getRegistry().has(`template:${name}`)) {
        return name;
      }
      if (this._isLoading(name)) {
        return "admin/loading";
      }
      if (this._isError(name)) {
        return "admin/error";
      }
    }
    if (this.action) {
      name = `${name}/${this.action}`;
    }
    if (name === "dashboard") {
      return "admin/dashboard";
    }
    if (this._getRegistry().has(`template:${name}`)) {
      return name;
    } else {
      if (this.action && this.action !== "page") {
        return `admin/${this.action}`;
      } else {
        return "admin/main";
      }
    }
  },

  _controllerName: function(controller) {
    return this.controllerName || (this.controllerName = controller._debugContainerKey.split(":")[1].replace(/(\/[Ss]how)|(\/[Ee]dit)|(\/[Nn]ew)/, ''));
  },

  _isLoading(name) {
    return name.match(/loading/);
  },

  _isError(name) {
    return name.match(/error/);
  },

  _setActiveRoute: function(controller) {
    var url;
    url = this._controllerName(controller);
    return this.controllerFor("navigation").set('activeMenu', url);
  },

  _setAction: function(action) {
    if (action !== "index") {
      return this.action = action;
    }
  },

  _checkAction: function(options, target) {
    if (/\./.test(target)) {
      target = target.split(".")[1];
      if (target) {
        return options.action = target;
      }
    }
  },

  _setupBreadscrumbs: function(controller, model) {
    return Breadcrumbs.setup(this.action, controller, model, this.controllerFor('breadcrumbs'));
  },

  _setSiteTitle: function(controller, model) {
    return SiteTitle.setup(this._controllerName(controller), model, this.action);
  }
});
