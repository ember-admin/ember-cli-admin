(function() {
  if (!this.AdminResolver) {
    this.AdminResolver = Ember.Namespace.create();
  }

  this.AdminResolver = Ember.DefaultResolver.extend({
    resolveController: function(parsedName) {
      this.useRouterNaming(parsedName);
      if (this._checkResourceController(parsedName.fullName)) {
        this._setNames(parsedName);
      }
      if (this.resolveOther(parsedName)) {
        return this.resolveOther(parsedName);
      } else {
        if (parsedName.fullNameWithoutType === "dashboard") {
          return Admin.DashboardController;
        }
        if (parsedName.fullNameWithoutType === "breadcrumbs") {
          return Admin.BreadcrumbsController;
        }
        if (parsedName.fullNameWithoutType === "navigation") {
          return Admin.NavigationController;
        }
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
      return /([Ss]how)|([Ee]dit)|([Nn]ew)/;
    }
  });

}).call(this);

(function() {
  window.Admin = Ember.Application.extend({
    name: "admin",
    Resolver: window.AdminResolver,
    Router: Ember.Router.extend(),
    ready: function() {}
  });

}).call(this);

(function() {
  if (!window.Admin) {
    window.Admin = Ember.Namespace.create();
  }

  window.Admin.DSL = Ember.Namespace.create();

  window.Admin.Logics = Ember.Namespace.create();

  window.Admin.Base = Ember.Namespace.create();

  window.Admin.Base.Controllers = Ember.Namespace.create();

  window.Admin.Base.Views = Ember.Namespace.create();

  window.Admin.Base.Views.Table = Ember.Namespace.create();

  window.Admin.Mixins = Ember.Namespace.create();

  window.Admin.Mixins.Controllers = Ember.Namespace.create();

  window.Admin.Mixins.Routes = Ember.Namespace.create();

  window.Admin.Fileupload = Ember.Namespace.create();

  window.Admin.Adapters = Ember.Namespace.create();

  window.Admin.Forms = Ember.Namespace.create();

}).call(this);

(function() {
  Admin.DSL.Attributes = (function() {
    function Attributes() {}

    Attributes.detect = function(modelType) {
      return this.withId(modelType);
    };

    Attributes.withId = function(modelType) {
      var attrs;
      attrs = this.withoutId(modelType);
      attrs.unshift("id");
      return attrs;
    };

    Attributes.withoutId = function(modelType) {
      var attributes,
        _this = this;
      attributes = [];
      modelType.eachComputedProperty(function(attribute, meta) {
        if (meta.isAttribute && _this.systemAttrs(modelType).indexOf(attribute) < 0) {
          return attributes.push(attribute);
        }
      });
      this.relations(modelType, attributes, false);
      return attributes;
    };

    Attributes.relations = function(modelType, attrs, hasMany) {
      var _this = this;
      if (attrs == null) {
        attrs = [];
      }
      if (hasMany == null) {
        hasMany = true;
      }
      modelType.eachRelationship(function(attribute, meta) {
        if (hasMany) {
          return attrs.push(attribute);
        } else {
          if (meta.kind !== "hasMany") {
            return attrs.push(attribute);
          }
        }
      });
      return attrs;
    };

    Attributes.isBelongsTo = function(modelType, property) {
      var _belongsTo,
        _this = this;
      _belongsTo = false;
      modelType.eachRelationship(function(attribute, meta) {
        if (meta.key === property && meta.kind === "belongsTo") {
          return _belongsTo = true;
        }
      });
      return _belongsTo;
    };

    Attributes.relationForType = function(modelType, relation) {
      var type,
        _this = this;
      type = void 0;
      modelType.eachRelationship(function(attribute, meta) {
        if (meta.key === relation) {
          return type = meta.type;
        }
      });
      return type;
    };

    Attributes.systemAttrs = function(modelType) {
      return ["created_at", "updated_at"];
    };

    return Attributes;

  })();

}).call(this);

(function() {
  Admin.MetaRoute = (function() {
    function MetaRoute() {}

    MetaRoute.map = function(callback) {
      return callback.call(new Admin.MetaRoute());
    };

    MetaRoute.prototype.resources = function(name) {
      var self;
      self = this;
      return App.Router.map(function() {
        this.route(name, {
          path: "/" + name
        });
        this.route("" + name + ".edit", {
          path: self._action_edit_path(name)
        });
        this.route("" + name + ".show", {
          path: self._action_show_path(name)
        });
        this.route("" + name + ".new", {
          path: self._new_path(name)
        });
        return this.route("" + name + ".page", {
          path: self._paginationPath(name)
        });
      });
    };

    MetaRoute.prototype._action_show_path = function(name) {
      return "/" + name + "/:id/show";
    };

    MetaRoute.prototype._action_edit_path = function(name) {
      return "/" + name + "/:id/edit";
    };

    MetaRoute.prototype._paginationPath = function(name) {
      return "/" + name + "/page/:page";
    };

    MetaRoute.prototype._new_path = function(name) {
      return "/" + name + "/new";
    };

    return MetaRoute;

  })();

}).call(this);

/*
  This file create navigation menu in top

  @navigate
  @params:
    @title - string
    @options - hash
    @nestedMenu - function

  If you want use another main controller, you must set route param to ""
  for example:
    @navigate "MyDashboard", route: ""

  When you want use Menu group:

    @navigate "Users", ->
      @navigate "Admins"
      @navigate "Managers"

  You can change url for menu when pass url params
      @navigate "Dashboard", url: "/my_dashboard", route: "my_dashboard"

params:
  url
  route
  divider true|false   -> default false
*/


/*
  for testing
    @navigate "System", ->
      @navigate "Users"
      @navigate "Settings", divider: true
*/


(function() {
  Admin.DSL.Navigation = (function() {
    Navigation.content = [];

    function Navigation(container, parentId) {
      this.parentId = parentId;
      this.container = container || [];
    }

    Navigation.map = function(callback) {
      var navigation;
      navigation = new Admin.DSL.Navigation();
      callback.call(navigation);
      return this.content = navigation.container;
    };

    Navigation.prototype.navigate = function(title, options, callback) {
      var emberObject, navigateObject;
      navigateObject = {
        title: title,
        children: [],
        divider: false,
        id: this._uid()
      };
      if (this.parentId) {
        navigateObject.parentId = this.parentId;
      }
      if (options && typeof options !== 'function') {
        navigateObject = $.extend(navigateObject, options);
      }
      this._makeRoute(navigateObject);
      this._makeUrl(navigateObject);
      emberObject = Ember.Object.create(navigateObject);
      this.container.push(emberObject);
      if (typeof options === 'function') {
        callback = options;
      }
      if (callback) {
        emberObject.set('hasChildren', true);
        callback.call(new Admin.DSL.Navigation(emberObject.get('children'), emberObject.get('id')));
      }
      return this.container;
    };

    Navigation.prototype._makeRoute = function(options) {
      if (options == null) {
        options = {};
      }
      if (options.route === void 0) {
        return options.route = options.title.underscore();
      }
    };

    Navigation.prototype._makeUrl = function(options) {
      if (options == null) {
        options = {};
      }
      if (!options.url) {
        return options.url = "#/%@".fmt(options.route);
      }
    };

    Navigation.prototype._uid = function() {
      return Math.random().toString(36).substr(2, 9);
    };

    Navigation.findParent = function(obj) {
      var _this = this;
      return this.content.find(function(item) {
        return item.id === obj.parentId;
      });
    };

    return Navigation;

  })();

}).call(this);

(function() {
  Admin.Asset = DS.Model.extend({
    original_filename: DS.attr('string'),
    content_type: DS.attr('string', {
      defaultValue: ""
    }),
    guid: DS.attr('string', {
      defaultValue: ""
    }),
    assetable_id: DS.attr('string'),
    assetable_type: DS.attr('string'),
    thumb_url: DS.attr('string'),
    url: DS.attr('string'),
    type: DS.attr('string', {
      defaultValue: "Asset"
    }),
    is_main: DS.attr('boolean', {
      defaultValue: false
    })
  });

  Admin.Asset.reopenClass({
    extend: function(obj) {
      var adapter, name;
      name = obj.type._meta.options.defaultValue;
      adapter = "window.App.%@Adapter = window.App.ApplicationAdapter.extend(Admin.FileuploadAdapterMixin)".fmt(name);
      eval(adapter);
      return this._super.apply(this, arguments);
    }
  });

}).call(this);

(function() {
  Admin.Logics.Breadcrumbs = Ember.Object.extend();

  Admin.Logics.Breadcrumbs.reopenClass({
    setup: function(action, controller, model, breadcrumbs_controller) {
      var content, name, obj;
      content = [];
      obj = Ember.Object.create({
        name: "dashboard",
        url: this._url("#/"),
        "class": "first",
        active: false
      });
      content.pushObject(obj);
      obj = Ember.Object.create({
        name: controller.get('__controller_name'),
        url: this._url("#/" + (controller.get('__controller_name'))),
        "class": "active",
        active: true
      });
      if (action && action !== "page") {
        obj.set('class', "");
        obj.set('active', false);
        content.pushObject(obj);
        name = model.get('id') || action;
        obj = Ember.Object.create({
          name: name,
          "class": "active",
          active: true
        });
        content.pushObject(obj);
      } else {
        content.pushObject(obj);
      }
      breadcrumbs_controller.set('content', content);
      return this._actions(action, controller);
    },
    _url: function(url) {
      if (Admin.Logics.Config.get('namescpace')) {
        return "/%@%@".fmt(Admin.Logics.Config.get('namescpace'), url);
      } else {
        return url;
      }
    },
    _actions: function(action, controller) {
      var actions;
      actions = [];
      switch (action) {
        case "edit":
          actions.push(this._createAction());
          actions.push(this._showAction());
          actions.push(this._destroyAction());
          break;
        case "show":
          actions.push(this._createAction());
          actions.push(this._editAction());
          actions.push(this._destroyAction());
          break;
        default:
          actions.push(this._createAction());
      }
      return controller.set("__breadcrumbsActionsArray", actions);
    },
    _createAction: function() {
      return "new";
    },
    _editAction: function() {
      return "edit";
    },
    _destroyAction: function() {
      return "destroy";
    },
    _showAction: function() {
      return "show";
    }
  });

}).call(this);

(function() {
  Admin.Logics.Pagination = Ember.Object.extend();

  Admin.Logics.Pagination.reopenClass({
    setup: function(controller, page) {
      var nextPage, prevPage;
      if (page) {
        nextPage = page + 1;
        prevPage = page - 1 < 1 ? 1 : page - 1;
        controller.set('__nextPage', nextPage);
        return controller.set('__prevPage', prevPage);
      } else {
        controller.set('__nextPage', void 0);
        return controller.set('__prevPage', void 0);
      }
    }
  });

}).call(this);

(function() {
  Admin.Logics.SiteTile = Ember.Object.extend();

  Admin.Logics.SiteTile.reopenClass({
    setup: function(controllerName, model, action) {
      if (action) {
        return document.title = "%@ - %@ - %@".fmt(controllerName, model.get('id'), action);
      } else {
        return document.title = "%@ - list".fmt(controllerName);
      }
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Controllers.AttributesMixin = Ember.Mixin.create({
    formAttributes: (function() {
      var attrs,
        _this = this;
      attrs = this.get('model.formFields') || Admin.DSL.Attributes.withoutId(this.get("model").constructor);
      return attrs.map(function(attr) {
        return {
          name: attr
        };
      });
    }).property('modelAttributes.@each'),
    tableAttributes: (function() {
      return this.get('modelAttributes');
    }).property('modelAttributes.@each'),
    fileuploads: (function() {
      if (this.get('model.fileuploads')) {
        return this.get('model.fileuploads').map(function(attr) {
          return {
            name: attr
          };
        });
      }
    }).property('model.fileuploads')
  });

}).call(this);

/*
  This is base controller for use in all views
  If you wont add you action please override this actions
  Or you can use additionalActions property!
  for example:
   In your controller
    additionalActions:(->
      [{title: "my action", class: "btn my-action-css", action: "my"}]
    ).property()

  use @@confirm property for show text in confirmation modal
  @@action - is an action in your controller which pass model param

  #for batch actions you don't need save model, because save call automatic when all objects

  # for custom breadcrumbs actions you need override
   breadcrumbsActions property and add action title, then add this action into additionalActions property
*/


(function() {
  Admin.Mixins.Controllers.BaseActionsMixin = Ember.Mixin.create({
    collectionActions: [
      {
        title: "Edit",
        "class": "btn btn-small btn-primary",
        action: "edit",
        iconClass: "glyphicon glyphicon-pencil"
      }, {
        title: "Show",
        "class": "btn btn-small btn-success",
        action: "show",
        iconClass: "glyphicon glyphicon-info-sign"
      }, {
        title: "Delete",
        confirm: "are you shure to delete this?",
        "class": "btn btn-small btn-danger",
        action: "destroy",
        iconClass: "glyphicon glyphicon-trash"
      }
    ],
    actionNew: (function() {
      return {
        title: "New",
        "class": "btn btn-primary",
        action: "new",
        iconClass: "glyphicon glyphicon-plus"
      };
    }).property('model'),
    breadcrumbsActions: (function() {
      return this.get('__breadcrumbsActionsArray');
    }).property('__breadcrumbsActionsArray'),
    actions: {
      "new": function() {
        return this.transitionToRoute(this._path("new"));
      },
      edit: function(model) {
        return this.transitionToRoute(this._path(model, "edit"));
      },
      update: function(model) {
        return model.save();
      },
      destroy: function(model, batch) {
        if (batch == null) {
          batch = false;
        }
        if (this.get('model.__list')) {
          model.deleteRecord();
          this.get('model.items').removeObject(model);
          if (!batch) {
            this.get('__batches').removeObject(model);
          }
          return model.save();
        } else {
          return this._destroyItem(model);
        }
      },
      show: function(model) {
        return this.transitionToRoute(this._path(model, "show"));
      }
    },
    _destroyItem: function(model) {
      var _this = this;
      model.deleteRecord();
      return model.save().then(function() {
        return _this.transitionToRoute(_this.get('__controller_name'));
      });
    },
    _path: function(model, type) {
      if (type) {
        return "/%@/%@/%@".fmt(this.get('__controller_name'), model.get('id'), type);
      } else {
        return "/%@/%@".fmt(this.get('__controller_name'), model);
      }
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Controllers.BatchActionsMixin = Ember.Mixin.create({
    __batches: [],
    batchActions: [
      {
        title: "delete",
        confirm: "Are you sure to delete this?",
        action: "destroy"
      }
    ],
    actions: {
      baseBatchAction: function(action) {
        var _this = this;
        this.get('__batches').forEach(function(model) {
          return _this.send(action, model, true);
        });
        return this.set('__batches', []);
      }
    }
  });

}).call(this);

/*
  You can override this method for create your own logic for create asset
*/


(function() {
  Admin.Mixins.Controllers.FileUploadMixin = Ember.Mixin.create({
    actions: {
      createAsset: function(asset, property, view) {
        var _this = this;
        return asset.save().then(function() {
          view.set('creating', false);
          view.clearInput();
          if (view.get('single')) {
            return _this._createBelongsTo(asset, property);
          } else {
            return _this._createHasMany(asset, property);
          }
        });
      },
      deleteAsset: function(asset, single, property) {
        asset.deleteRecord();
        asset.save();
        if (single) {
          return this._deleteBelongsTo(asset, property);
        } else {
          return this._deleteHasMany(asset, property);
        }
      }
    },
    _createBelongsTo: function(asset, property) {
      var state;
      this.get("model").set(property, asset);
      if (this.get('model.isDirty')) {
        if (this.get('model.id')) {
          state = DS.RootState.loaded.saved;
          return this.get("model").set('currentState', state);
        }
      }
    },
    _createHasMany: function(asset, property) {
      return this.get("model." + property).pushObject(asset);
    },
    _deleteBelongsTo: function(asset, property) {
      var _this = this;
      return asset.one('didDelete', function() {
        var state;
        _this.get("model").set(property, null);
        if (_this.get('model.isDirty')) {
          state = DS.RootState.loaded;
          return _this.get("model").set('currentState', state.saved);
        }
      });
    },
    _deleteHasMany: function(asset, property) {
      return this.get("model." + property).removeObject(asset);
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Controllers.FormActionsMixin = Ember.Mixin.create({
    actions: {
      submit: function(redirect) {
        if (redirect == null) {
          redirect = true;
        }
        if (this.get('model.id')) {
          return this._updateModel(redirect);
        } else {
          return this._createModel(redirect);
        }
      },
      cancel: function() {
        if (this.get('model.isDirty')) {
          this.get('model').rollback();
        }
        return this._redirectToTable();
      }
    },
    _redirectToTable: function() {
      return this.transitionToRoute(this.get('__controller_name'));
    },
    _updateModel: function(redirect) {
      var _this = this;
      return this.get('model').save().then(function() {
        if (redirect) {
          return _this._redirectToTable();
        }
      });
    },
    _createModel: function(redirect) {
      var _this = this;
      return this.get('model').save().then(function() {
        if (redirect) {
          return _this._redirectToTable();
        } else {
          return _this.send('edit', _this.get('model'));
        }
      });
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Controllers.PaginationMixin = Ember.Mixin.create({
    __perPage: parseInt($.cookie('perPage')) || 25,
    reloadTable: (function() {
      var options,
        _this = this;
      options = {
        per_page: this.get('__perPage'),
        page: this.get('__page') || 1
      };
      return this.get('store').find(this.get('__model_name'), options).then(function(collection) {
        return _this.set('model.items', collection);
      });
    }).observes('__perPage'),
    actions: {
      changePerPage: function(perPage) {
        $.cookie('perPage', perPage);
        return this.set('__perPage', perPage);
      }
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Routes.ControllerMixin = Ember.Mixin.create({
    _getForm: function(controller) {
      var form;
      form = "%@_form".fmt(this._controllerName(controller).decamelize());
      if (Ember.TEMPLATES[form]) {
        return form;
      } else {
        return "form";
      }
    },
    _getControllerTemplate: function(controller) {
      var name;
      name = this._controllerName(controller);
      if (Ember.TEMPLATES[name] || Ember.TEMPLATES["ember-admin/%@".fmt(name)]) {
        return name;
      } else {
        if (this.action && this.action !== "page") {
          return this.action;
        } else {
          return "main";
        }
      }
    },
    _controllerName: function(controller) {
      return controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)|(Page)/, '');
    },
    _setActiveRoute: function(controller) {
      var url;
      url = "#/%@".fmt(this._controllerName(controller));
      if (url === "#/dashboard") {
        url = "#/";
      }
      return this.controllerFor("navigation").set('activeMenu', url);
    },
    _setAction: function(action) {
      return this.action = action;
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
      return Admin.Logics.Breadcrumbs.setup(this.action, controller, model, this.controllerFor('breadcrumbs'));
    },
    _setType: function(controller, type) {
      return controller.set('__type', type.toString().replace("Admin.", ""));
    },
    _setSiteTitle: function(controller, model) {
      return Admin.Logics.SiteTile.setup(this._controllerName(controller), model, this.action);
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Routes.ModelMixin = Ember.Mixin.create({
    _find_model: function(modelName, options) {
      if (options.action === "new") {
        return this.store.createRecord(modelName, {});
      }
      if (!options.id) {
        return this.pagination(modelName);
      }
      if (this._checkPaginations()) {
        return this.pagination(modelName, options.id);
      }
      return this.store.find(modelName, options.id);
    },
    _setModel: function(controller, model) {
      if (!model) {
        return;
      }
      if (model.type) {
        return controller.set('model', Ember.Object.create({
          items: model,
          __list: true
        }));
      }
      return controller.set('model', model);
    },
    _modelName: function(name) {
      if (/\./.test(name)) {
        name = name.split(".")[0];
      }
      return Ember.String.singularize(name);
    }
  });

}).call(this);

(function() {
  Admin.Mixins.Routes.PaginationMixin = Ember.Mixin.create({
    pagination: function(modelName) {
      var perPage;
      perPage = $.cookie('perPage') || 25;
      return this.store.find(modelName, {
        page: this.page,
        per_page: perPage
      });
    },
    _checkPaginations: function() {
      return this.action === "page";
    },
    _setPage: function(page) {
      return this.page = parseInt(page) || 1;
    },
    _setupPaginationInfo: function(controller) {
      controller.set('__page', this.page);
      controller.set('__controller_name', this._controllerName(controller));
      controller.set('__model_name', this.modelName);
      return Admin.Logics.Pagination.setup(controller, this.page);
    }
  });

}).call(this);

(function() {
  Admin.MainRoute = Ember.Route.extend(Admin.Mixins.Routes.PaginationMixin, Admin.Mixins.Routes.ModelMixin, Admin.Mixins.Routes.ControllerMixin, {
    model: function(options, transition) {
      this.action = void 0;
      this.page = void 0;
      this.modelName = this._modelName(transition.targetName);
      this._checkAction(options, transition.targetName);
      if (options.action) {
        this._setAction(options.action);
      }
      this._setPage(options.page);
      if (eval("App.%@".fmt(this.modelName.classify()))) {
        return this._find_model(this.modelName, options);
      }
    },
    setupController: function(controller, model) {
      var type;
      this._setSiteTitle(controller, model);
      if (model) {
        this._setModel(controller, model);
        type = model.type || model.constructor;
        this._setType(controller, type);
        this._setupPaginationInfo(controller);
        controller.set('modelAttributes', Admin.DSL.Attributes.detect(type));
        return controller.set('batches', []);
      }
    },
    renderTemplate: function(controller, model) {
      this._setActiveRoute(controller);
      if (model) {
        this._setupBreadscrumbs(controller, model);
      }
      this.render(this._getControllerTemplate(controller), {
        outlet: "main",
        controller: controller
      });
      this._renderNavigation(controller, model);
      this.controllerFor('breadcrumbs').set('resource', model);
      this._renderBreadcrumbs(controller, model);
      this._renderActions(controller, model);
      return this._renderForm(controller, model);
    },
    _renderNavigation: function(controller, model) {
      return this.render('navigation', {
        outlet: 'navigation',
        controller: 'navigation'
      });
    },
    _renderBreadcrumbs: function(controller, model) {
      return this.render('breadcrumbs', {
        outlet: 'breadcrumbs',
        controller: 'breadcrumbs'
      });
    },
    _renderActions: function(controller, model) {
      if (model) {
        return this.render('actions', {
          outlet: 'actions',
          controller: controller
        });
      }
    },
    _renderForm: function(controller, model) {
      if (this.action && (this.action === "edit" || this.action === "new")) {
        return this.render(this._getForm(controller), {
          into: this.action,
          outlet: 'form',
          controller: controller
        });
      }
    }
  });

}).call(this);

(function() {
  Admin.Logics.Config = Ember.Object.create({});

  Admin.Logics.Config.set('siteTitle', "Ember Admin");

  Admin.Logics.Config.set('mapCenter', "50.44067063154785,30.52654266357422");

}).call(this);

(function() {
  Admin.Base.Views.BaseActionView = Ember.View.extend({
    actions: {
      confirm: function() {
        return Ember.View.views["ActionModal"].$().modal('hide');
      }
    },
    _showConfirmation: function() {
      var action, modalView;
      action = this.get('action') || this.get('context');
      modalView = Ember.View.views["ActionModal"];
      modalView.set('action', action);
      modalView.set('target', this);
      return modalView.$().modal({});
    }
  });

}).call(this);

(function() {
  Admin.Base.Controllers.AdminBaseController = Ember.ObjectController.extend(Admin.Mixins.Controllers.BaseActionsMixin, Admin.Mixins.Controllers.FileUploadMixin, Admin.Mixins.Controllers.AttributesMixin, Admin.Mixins.Controllers.PaginationMixin, Admin.Mixins.Controllers.BatchActionsMixin, Admin.Mixins.Controllers.FormActionsMixin);

}).call(this);

(function() {
  Admin.Base.Controllers.AdminTableViewController = Admin.Base.Controllers.AdminBaseController.extend({
    __table: true
  });

}).call(this);

(function() {
  Ember.Handlebars.registerHelper("input-field", function(property, options) {
    var config, configs, context, i, inputOptions, inputType, optionName, propertyType, type;
    options = Ember.EasyForm.processOptions(property, options);
    context = this;
    if (options.hash.propertyBinding) {
      options.hash.property = Ember.Handlebars.get(this, options.hash.propertyBinding, options);
    }
    if (options.hash.inputOptionsBinding) {
      options.hash.inputOptions = Ember.Handlebars.get(this, options.hash.inputOptionsBinding, options);
    }
    property = options.hash.property;
    propertyType = function(property) {
      var e;
      try {
        return (context.get("content") || context).constructor.metaForProperty(property).type;
      } catch (_error) {
        e = _error;
        return null;
      }
    };
    options.hash.valueBinding = property;
    options.hash.viewName = "input-field-" + options.data.view.elementId;
    if (options.hash.inputOptions) {
      inputOptions = options.hash.inputOptions;
      optionName = void 0;
      for (optionName in inputOptions) {
        if (inputOptions.hasOwnProperty(optionName)) {
          options.hash[optionName] = inputOptions[optionName];
        }
      }
      delete options.hash.inputOptions;
    }
    if (options.hash.inputConfig) {
      configs = options.hash.inputConfig.split(";");
      i = configs.length;
      while (i--) {
        config = configs[i].split(":");
        options.hash[config[0]] = config[1];
      }
    }
    if (options.hash.as === "text") {
      return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextArea, options);
    } else if (options.hash.as === "select") {
      delete options.hash.valueBinding;
      type = context.get("model").constructor;
      if (Admin.DSL.Attributes.relations(type).indexOf(property) >= 0) {
        options.hash.attribute = property;
        options.hash.content = context.store.findAll(property);
        options.hash.selection = context.get(property);
        options.hash.optionValuePath = "context.id";
        options.hash.optionLabelPath = "context.title";
        options.hash.prompt = "Place select %@".fmt(property);
      } else {
        options.hash.contentBinding = options.hash.collection;
        options.hash.selectionBinding = options.hash.selection;
        options.hash.valueBinding = options.hash.value;
      }
      return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.Select, options);
    } else {
      if (!options.hash.as) {
        if (property.match(/password/)) {
          options.hash.type = "password";
        } else if (property.match(/email/)) {
          options.hash.type = "email";
        } else if (property.match(/url/)) {
          options.hash.type = "url";
        } else if (property.match(/color/)) {
          options.hash.type = "color";
        } else if (property.match(/^tel/)) {
          options.hash.type = "tel";
        } else if (property.match(/search/)) {
          options.hash.type = "search";
        } else {
          if (propertyType(property) === "number" || typeof (context.get(property)) === "number") {
            options.hash.type = "number";
          } else if (propertyType(property) === "date" || (!Ember.isNone(context.get(property)) && context.get(property).constructor === Date)) {
            options.hash.type = "date";
          } else if (propertyType(property) === "boolean" || (!Ember.isNone(context.get(property)) && context.get(property).constructor === Boolean)) {
            options.hash.checkedBinding = property;
            return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.Checkbox, options);
          }
        }
      } else {
        inputType = Ember.EasyForm.Config.getInputType(options.hash.as);
        if (inputType) {
          options.hash.property = property;
          return Ember.Handlebars.helpers.view.call(context, inputType, options);
        }
        options.hash.type = options.hash.as;
      }
      return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextField, options);
    }
  });

  Ember.Handlebars.registerHelper("input", function(property, options) {
    options = Ember.EasyForm.processOptions(property, options);
    if (Admin.Forms.Filters.fileupload(options, property)) {
      return;
    }
    if (Admin.Forms.Filters.mapField(options, property)) {
      return;
    }
    Admin.Forms.Filters.as(options, property);
    options.hash.property = property;
    options.hash.isBlock = !!options.fn;
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Input, options);
  });

  Ember.Handlebars.registerBoundHelper("bound-input", function(property, options) {
    options = Ember.EasyForm.processOptions(property, options);
    if (Admin.Forms.Filters.fileupload(options, property)) {
      return;
    }
    if (Admin.Forms.Filters.mapField(options, property)) {
      return;
    }
    Admin.Forms.Filters.as(options, property);
    options.hash.property = property;
    options.hash.isBlock = !!options.fn;
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Input, options);
  });

  Ember.Handlebars.registerHelper('input-map', function(property, options) {
    options = Ember.EasyForm.processOptions(property, options);
    options.hash.property = property;
    options.hash.isBlock = !!options.fn;
    return Admin.Forms.Filters.map(options, property);
  });

  Ember.EasyForm.Select = Ember.Select.extend({
    attributeBindings: ["attribute"],
    change: function() {
      var path;
      path = "context.%@".fmt(this.get("attribute"));
      return this.set(path, this.get("selection"));
    }
  });

  Ember.EasyForm.Form.reopen({
    submit: function(event) {
      var promise, _this;
      _this = this;
      promise = void 0;
      event.preventDefault();
      if (this.get("context.isValid")) {
        return this.get("controller").send(this.action);
      }
      if (Ember.isNone(this.get("context.isValid"))) {
        return this.get("controller").send(this.action);
      } else {
        if (!Ember.isNone(this.get("context").validate)) {
          promise = this.get("context").validate();
        } else {
          promise = this.get("context.content").validate();
        }
        return promise.then(function() {
          if (_this.get("context.isValid")) {
            return _this.get("controller").send(_this.action);
          }
        });
      }
    }
  });

}).call(this);

(function() {
  Admin.Forms.Filters = Ember.Object.extend().reopenClass({
    fileupload: function(options, property) {
      var context;
      context = options.contexts[0];
      return context.get("fileuploads") !== undefined && context.get("fileuploads").getEach("name").indexOf(property) >= 0;
    },
    mapField: function(options, property) {
      var context, exist;
      context = options.contexts[0];
      exist = context.get("asGoogleMap") !== undefined && context.get("asGoogleMap").indexOf(property) >= 0;
      if (exist) {
        return exist;
      }
      return context.get("asYandexMap") !== undefined && context.get("asYandexMap").indexOf(property) >= 0;
    },
    as: function(options, property) {
      var type;
      type = options.contexts[0].get("model").constructor;
      if (Admin.DSL.Attributes.relations(type).indexOf(property) >= 0) {
        return options.hash.as = "select";
      }
    },
    map: function(options, property) {
      var context;
      context = options.contexts[0];
      if (context.get('asGoogleMap')) {
        return Ember.Handlebars.helpers.view.call(context, Admin.Base.Views.GmapView, options);
      }
      if (context.get('asYandexMap')) {
        return Ember.Handlebars.helpers.view.call(context, Admin.Base.Views.YandexMapView, options);
      }
    }
  });

}).call(this);

(function() {
  Ember.Handlebars.registerHelper("fileupload", function(property, options) {
    options.hash.inputOptions = Ember.copy(options.hash);
    options.hash.property = property;
    return Ember.Handlebars.helpers.view.call(this, Admin.Fileupload.DragAndDropZoneView, options);
  });

  Ember.Handlebars.registerBoundHelper("bound-fileupload", function(property, options) {
    options.hash.inputOptions = Ember.copy(options.hash);
    options.hash.property = property;
    return Ember.Handlebars.helpers.view.call(this, Admin.Fileupload.DragAndDropZoneView, options);
  });

}).call(this);

(function() {
  Admin.Base.Views.ActionView = Admin.Base.Views.BaseActionView.extend({
    classNameBindings: ["class"],
    attributeBindings: ["title"],
    "class": (function() {
      return this.get('action.class');
    }).property('action'),
    click: function() {
      var model;
      model = this.get('model') || this.get('controller.model');
      if (this.get('action.confirm')) {
        return this._showConfirmation();
      } else {
        return this.get('controller').send(this.get('action.action'), model);
      }
    },
    actions: {
      confirm: function() {
        var model;
        model = this.get('model') || this.get('controller.model');
        this.get('controller').send(this.get('action.action'), model);
        return this._super();
      }
    },
    action: (function() {
      if (this.get('breadcrumbAction')) {
        switch (this.get('breadcrumbAction')) {
          case "new":
            return this.get('controller.actionNew');
          case "edit":
            return this._findAction('Edit');
          case "destroy":
            return this._findAction('Delete');
          case "show":
            return this._findAction('Show');
          default:
            return "";
        }
      } else {
        return this.get('context');
      }
    }).property('context'),
    title: (function() {
      return this.get('action.title');
    }).property('action'),
    _findAction: function(title) {
      var _this = this;
      return this.get('controller.collectionActions').find(function(action) {
        return action.title === title;
      });
    },
    _findAdditionalActions: function(title) {
      var _this = this;
      return this.get('controller.__additionalActions').find(function(action) {
        return action.title === title;
      });
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.BatchActionView = Admin.Base.Views.BaseActionView.extend({
    tagName: "li",
    click: function() {
      event.preventDefault();
      if (this.get('controller.__batches.length') < 1) {
        return;
      }
      if (this.get('context.confirm')) {
        return this._showConfirmation();
      } else {
        return this._batchAction();
      }
    },
    actions: {
      confirm: function() {
        this._batchAction();
        return this._super();
      }
    },
    _batchAction: function() {
      this.get('controller').send("baseBatchAction", this.get('context.action'));
      return Ember.View.views["select-all-batches"].set('checked', false);
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.CheckboxBatchView = Ember.Checkbox.extend({
    selectAll: false,
    pushItem: (function() {
      if (this.get('selectAll')) {
        return this._selectAllAction();
      }
      if (this.get('checked')) {
        return this._addItem(this.get('context'));
      } else {
        return this.get('controller.__batches').removeObject(this.get('context'));
      }
    }).observes('checked'),
    _selectAllAction: function() {
      var _this = this;
      this.set('controller.__batches', []);
      if (!this.get('checked')) {
        return;
      }
      return this.get('controller.model.items').forEach(function(item) {
        return _this._addItem(item);
      });
    },
    _addItem: function(item) {
      if (!(this.get('controller.__batches').indexOf(item) >= 0)) {
        return this.get('controller.__batches').pushObject(item);
      }
    },
    createObserverOnBatch: (function() {
      var _this = this;
      return this.addObserver("controller.__batches.length", this, function() {
        if (_this.get('selectAll')) {
          return;
        }
        if (_this.get('controller.__batches').indexOf(_this.get('context')) >= 0) {
          return _this.set('checked', true);
        } else {
          return _this.set('checked', false);
        }
      });
    }).on('didInsertElement')
  });

}).call(this);

(function() {
  Admin.Base.Views.BreadcrumbView = Ember.View.extend({
    tagName: "a",
    attributeBindings: ["class", "href"],
    click: function(event) {
      event.preventDefault();
      if (!this.get('controller.resource.__list')) {
        if (this.get('controller.resource.isDirty')) {
          this.get('controller.resource').rollback();
        }
      }
      if (this.get('url') === "#/") {
        this.set('url', '');
      }
      return this.get('controller').transitionToRoute(this.get('url'));
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.ButtonView = Ember.View.extend({
    tagName: "button",
    classNames: ["btn btn-default"],
    action: '',
    click: function() {
      return this.get('controller').send(this.get('action'), this.get('context'));
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.TextInputView = Ember.TextField.extend({
    classNames: ["form-control"],
    attributeBindings: ["value", "readonly"],
    readonly: (function() {
      return this.get('attributeName') === 'id';
    }).property(),
    value: (function() {
      return this.get(this.path());
    }).property('context', 'attributeName'),
    path: function() {
      return "context.%@".fmt(this.get('attributeName'));
    },
    focusOut: function(event) {
      return this.get('context').set(this.get('attributeName'), this.get('value'));
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.AbstractMapView = Ember.View.extend({
    templateName: "base/_geo",
    lan: (function() {
      return this.get("context." + (this.get('lanAttr')));
    }).property(),
    setLan: function(value) {
      return this.get('context').set(this.get('lanAttr'), value);
    },
    lanAttr: (function() {
      return this.get("context." + (this.get('mapType')))[0];
    }).property(),
    lng: (function() {
      return this.get("context." + (this.get('lngAttr')));
    }).property(),
    lngAttr: (function() {
      return this.get("context." + (this.get('mapType')))[1];
    }).property(),
    setLng: function(value) {
      return this.get('context').set(this.get('lngAttr'), value);
    },
    zoom: (function() {
      return this.get("context." + (this.get('zoomAttr'))) || 8;
    }).property(),
    zoomAttr: (function() {
      return this.get("context." + (this.get('mapType')))[2];
    }).property(),
    setZoom: function(value) {
      return this.get('context').set(this.get('zoomAttr'), value);
    },
    centerCoords: function() {
      if (this.get('lan') && this.get('lng')) {
        return [this.get('lan'), this.get('lng')];
      } else {
        return Admin.Logics.Config.get('mapCenter').split(",");
      }
    },
    setAttrs: function(pos) {
      if (pos['push']) {
        this.setLan(pos[0]);
        return this.setLng(pos[1]);
      } else {
        this.setLan(pos.ob);
        return this.setLng(pos.pb);
      }
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.GmapView = Admin.Base.Views.AbstractMapView.extend({
    templateName: "base/_geo",
    mapType: 'asGoogleMap',
    initialize: (function() {
      var map, marker, options,
        _this = this;
      options = {
        zoom: this.get('zoom'),
        center: this.get('center'),
        mapTypeId: this.get('mapTypeId')
      };
      map = new google.maps.Map(this.$().find(".map")[0], options);
      marker = this.initMarker(map);
      this.initAutocomplete(map, marker);
      return google.maps.event.addListener(map, 'zoom_changed', function() {
        return _this.setZoom(map.getZoom());
      });
    }).on('didInsertElement'),
    center: (function() {
      var coord;
      coord = this.centerCoords();
      return new google.maps.LatLng(coord[0], coord[1]);
    }).property(),
    mapTypeId: (function() {
      return google.maps.MapTypeId.ROADMAP;
    }).property(),
    initMarker: function(map) {
      var marker, options,
        _this = this;
      options = {
        position: this.get('center'),
        map: map,
        draggable: true
      };
      marker = new google.maps.Marker(options);
      google.maps.event.addListener(marker, 'dragend', function(event) {
        var pos;
        map.setCenter(event.latLng);
        pos = marker.getPosition();
        return _this.setAttrs(pos);
      });
      return marker;
    },
    initAutocomplete: function(map, marker) {
      var autocomplete, autocompleteView, input,
        _this = this;
      autocompleteView = this.get('MapAutocomplete');
      input = autocompleteView.$()[0];
      autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode']
      });
      return google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place, pos;
        place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }
        pos = place.geometry.location;
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(pos);
          map.setZoom(17);
        }
        marker.setPosition(pos);
        return _this.setAttrs(pos);
      });
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.MapAutocompleteView = Ember.TextField.extend({
    keyPress: function(event) {
      if (event.keyCode === 13) {
        return event.preventDefault();
      }
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.YandexMapView = Admin.Base.Views.AbstractMapView.extend({
    mapType: 'asYandexMap',
    templateName: "base/_geo",
    didInsertElement: function() {
      var self,
        _this = this;
      self = this;
      console.log(ymaps);
      return ymaps.ready(function() {
        return _this.initMap.call(self);
      });
    },
    initMap: function() {
      var map;
      map = new ymaps.Map('map_container', {
        center: this.get('center'),
        zoom: this.get('zoom')
      });
      this.initMarker(map);
      map.controls.add('zoomControl', {
        left: 5,
        top: 5
      }).add('typeSelector').add('mapTools', {
        left: 35,
        top: 5
      });
      return this.initAutocomplete();
    },
    center: (function() {
      return this.centerCoords();
    }).property(),
    initMarker: function(map) {
      var mark,
        _this = this;
      mark = new ymaps.Placemark(this.get('center'), {
        iconContent: '1',
        balloonContent: '',
        hintContent: ''
      }, {
        preset: 'twirl#violetIcon',
        draggable: true
      });
      map.geoObjects.add(mark);
      return mark.events.add("dragend", function(e) {
        return _this.setAttrs(mark.geometry.getCoordinates());
      });
    },
    initAutocomplete: function(map, marker) {
      var autocompleteView, input;
      autocompleteView = this.get('MapAutocomplete');
      return input = autocompleteView.$().hide();
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.PaginationLinkView = Ember.View.extend({
    attributeBindings: ["href"],
    tagName: "a",
    href: (function() {
      if (this.get('type') === "next") {
        return this._nextPage();
      } else {
        return this._prevPage();
      }
    }).property('controller.__page'),
    _nextPage: function() {
      return "#/" + (this.get('controller.__controller_name')) + "/page/" + (this.get('controller.__nextPage'));
    },
    _prevPage: function() {
      return "#/" + (this.get('controller.__controller_name')) + "/page/" + (this.get('controller.__prevPage'));
    }
  });

}).call(this);

(function() {
  Admin.Base.Views.PaginationPerPageView = Ember.View.extend({
    tagName: "button",
    classNames: ["btn btn-default"],
    attributeBindings: ["type"],
    classNameBindings: ["isActive:active: "],
    click: function() {
      if (!this.get('isActive')) {
        return this.get('controller').send("changePerPage", this.get('count'));
      }
    },
    isActive: (function() {
      return this.get('controller.__perPage') === this.get('count');
    }).property('controller.__perPage')
  });

}).call(this);

/*
  if you have own attr for display in relation you should change relations property

  if you have own image property you should change fileuploads property
*/


(function() {
  Admin.Base.Views.Table.TdView = Ember.View.extend({
    attributeBindings: ["style"],
    relations: "name title".w(),
    fileuploads: "thumb_url".w(),
    templateName: "base/_td_template",
    tagName: "td",
    createObserves: (function() {
      var _this = this;
      if (this.get('context.fileuploads') && this.get('context.fileuploads').indexOf(this.get('attributeName')) >= 0) {
        this.get('fileuploads').forEach(function(attr) {
          return _this.addObserver("context." + (_this.get('attributeName')) + "." + attr, function() {
            return this.notifyPropertyChange("value");
          });
        });
        return;
      }
      if (Admin.DSL.Attributes.relations(this.get('context').constructor).indexOf(this.get('attributeName')) >= 0) {
        this.get('relations').forEach(function(attr) {
          return _this.addObserver("context." + (_this.get('attributeName')) + "." + attr, _this, function() {
            return this.notifyPropertyChange("value");
          });
        });
        return;
      }
      return this.addObserver("context." + (this.get('attributeName')), this, function() {
        return this.notifyPropertyChange("value");
      });
    }).on('didInsertElement'),
    value: (function() {
      var record;
      record = this.get(this.path());
      if (typeof record !== "object") {
        return record;
      }
      return this.relation(record, this.get('attributeName'));
    }).property("context"),
    image_object: (function() {
      return this.get("context." + (this.get('attributeName')));
    }).property('value'),
    color: (function() {
      if (this.get('attributeName').match(/color/)) {
        this.set('text', true);
        return this.set('style', "color: " + (this.get('_value')) + ";");
      }
    }).property('value'),
    image: (function() {
      if (this.get('context.fileuploads') && this.get('context.fileuploads').indexOf(this.get('attributeName')) >= 0) {
        this.set('text', false);
        return true;
      }
    }).property('value'),
    text: (function() {
      return true;
    }).property('value'),
    path: function() {
      return "context.%@".fmt(this.get('attributeName'));
    },
    relation: function(record) {
      var value,
        _this = this;
      if (!record) {
        return;
      }
      value = "";
      if (this.get('context.fileuploads') && this.get('context.fileuploads').indexOf(this.get('attributeName')) >= 0) {
        this.get('fileuploads').forEach(function(attr) {
          if (record.get(attr)) {
            return value = record.get(attr);
          }
        });
      }
      if (Admin.DSL.Attributes.relations(this.get('context').constructor).indexOf(this.get('attributeName')) >= 0) {
        this.get('relations').forEach(function(attr) {
          if (record.get(attr)) {
            return value = record.get(attr);
          }
        });
      }
      return value;
    }
  });

}).call(this);

(function() {
  Admin.Fileupload.AssetView = Admin.Base.Views.BaseActionView.extend({
    attributeBindings: ["templateName", 'property'],
    actions: {
      deleteAsset: function() {
        return this._showConfirmation();
      },
      confirm: function() {
        this._deleteAsset(this.get('asset'), this.get('parentView.single'));
        return this._super();
      }
    },
    _deleteAsset: function(asset, single) {
      return this.get('controller').send('deleteAsset', asset, single, this.get('property'));
    },
    action: (function() {
      return {
        title: 'Delete',
        confirm: "Are you shure delete this?"
      };
    }).property()
  });

}).call(this);

(function() {
  Admin.Fileupload.DragAndDropZoneView = Ember.View.extend({
    attributeBindings: ["property", "assetTemplate"],
    assetTemplate: "fileuploads/asset",
    templateName: "fileuploads/drag_and_drop_zone",
    didInsertElement: function() {
      return this.get('single');
    },
    single: (function() {
      return Admin.DSL.Attributes.isBelongsTo(this.get("context.model").constructor, this.get('property'));
    }).property('context'),
    assets: (function() {
      Ember.defineProperty(this, "_assets", Ember.computed(function() {
        return this.get("context." + (this.get('property')));
      }).property("context." + (this.get('property'))));
      return this.get('_assets');
    }).property('_assets'),
    asset: (function() {
      Ember.defineProperty(this, "_asset", Ember.computed(function() {
        return this.get("context." + (this.get('property')));
      }).property("context." + (this.get('property'))));
      return this.get('_asset');
    }).property('_asset'),
    actions: {
      selectFile: function() {
        var file, files, _i, _len, _results;
        files = event.target.files;
        _results = [];
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          _results.push(this.createAsset(file));
        }
        return _results;
      }
    },
    drop: function(e) {
      var file, files, _i, _len, _results;
      e.stopPropagation();
      e.preventDefault();
      files = e.dataTransfer.files;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.createAsset(file));
      }
      return _results;
    },
    dragOver: function(e) {
      e.stopPropagation();
      e.preventDefault();
      return e.dataTransfer.dropEffect = 'copy';
    },
    dragLeave: function(e) {
      e.stopPropagation();
      return e.preventDefault();
    },
    dragEnter: function(e) {
      e.stopPropagation();
      return e.preventDefault();
    },
    createAsset: function(file) {
      this.set('creating', true);
      if (this.get('single')) {
        if (this.get("controller.model." + (this.get('property')))) {
          this.get("controller.model." + (this.get('property'))).deleteRecord();
          this.get("controller.model." + (this.get('property'))).save();
        }
        return this._createAsset(this._params(file), file);
      } else {
        return this._createAsset(this._params(file), file);
      }
    },
    _createAsset: function(params, file) {
      var asset, assetType, type;
      type = this.get('context.model').constructor;
      assetType = Admin.DSL.Attributes.relationForType(type, this.get('property'));
      asset = this.get('controller.store').createRecord(assetType, params);
      asset.set('file', file);
      return this.get('controller').send("createAsset", asset, this.get('property'), this);
    },
    _params: function(file) {
      var params;
      params = {
        assetable_type: this.get('controller.__type'),
        content_type: file.type,
        original_filename: file.name,
        is_main: true
      };
      if (this.get('context.id')) {
        params.assetable_id = this.get('context.id');
      }
      if (!this.get('single')) {
        params.is_main = false;
      }
      return params;
    },
    clearInput: function() {
      return this.$().find("input[type=file]").val('');
    }
  });

}).call(this);

(function() {
  Admin.Fileupload.ImageLinkView = Ember.View.extend({
    tagName: "a",
    attributeBindings: ["href"],
    href: "#",
    templateName: "fileuploads/link_to_image",
    click: function(e) {
      var imageView;
      e.preventDefault();
      imageView = Ember.View.views['FileUploadModal'];
      imageView.set('image', this.get('image'));
      return imageView.$().modal({});
    }
  });

}).call(this);

(function() {
  Admin.NavigationContentView = Ember.View.extend({
    tagName: "li",
    classNameBindings: ["isActive:active"],
    isActive: (function() {
      if (this.get('context.url') === this.get('controller.activeMenu')) {
        return true;
      }
      return this._hasChild();
    }).property('context', 'context.children', 'controller.activeMenu'),
    _hasChild: function() {
      var hasChild,
        _this = this;
      if (!this.get('context.children')) {
        return false;
      }
      hasChild = false;
      this.get('context.children').forEach(function(item) {
        if (item.url === _this.get('controller.activeMenu')) {
          return hasChild = true;
        }
      });
      return hasChild;
    }
  });

}).call(this);

(function() {
  Admin.ApplicationController = Admin.Base.Controllers.AdminTableViewController.extend();

}).call(this);

(function() {
  Admin.BreadcrumbsController = Ember.ArrayController.extend();

}).call(this);

(function() {
  Admin.DashboardController = Ember.Controller.extend();

}).call(this);

(function() {
  Admin.NavigationController = Ember.ArrayController.extend({
    activeMenu: "dashboard",
    content: (function() {
      return Admin.DSL.Navigation.content;
    }).property()
  });

}).call(this);

(function() {
  Ember.EasyForm.Config.registerWrapper('twitter-bootstrap', {
    formClass: 'form-horizontal',
    fieldErrorClass: 'has-error',
    errorClass: 'help-inline',
    hintClass: 'help-block',
    labelClass: 'control-label',
    inputClass: 'form-group',
    wrapControls: true,
    controlsWrapperClass: 'controls'
  });

}).call(this);

(function() {
  Admin.FileuploadAdapterMixin = Ember.Mixin.create({
    createRecord: function(store, type, record) {
      var adapter, url;
      url = this.buildURL(type.typeKey);
      adapter = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var data, request, str,
          _this = this;
        data = {};
        data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record, {
          includeId: true
        });
        if (record["_excludeParams"]) {
          str = $.param(record._excludeParams(data[type.typeKey]));
        } else {
          str = $.param(data[type.typeKey]);
        }
        url = "%@?%@".fmt(url, str);
        data.context = adapter;
        request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', record.get('content_type'));
        request.onreadystatechange = function() {
          if (request.readyState === 4 && (request.status === 201 || request.status === 200)) {
            data = JSON.parse(request.response);
            return Ember.run(null, resolve, data);
          }
        };
        return request.send(record.get('file'));
      });
    }
  });

}).call(this);
