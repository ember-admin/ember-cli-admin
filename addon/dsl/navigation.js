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
import Ember from 'ember';

const { Object: EmberObject, String: EmberString, merge } = Ember;
const { dasherize } = EmberString;

export default class Navigation {
  constructor(container, parentId) {
    this.parentId = parentId;
    this.container = container || [];
  }

  static map(callback) {
    var navigation;
    navigation = new Navigation();
    callback.call(navigation);
    return this.content = navigation.container;
  }

  navigate(title, options, callback) {
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
      navigateObject = merge(navigateObject, options);
    }
    this._makeRoute(navigateObject);
    emberObject = EmberObject.create(navigateObject);
    this.container.push(emberObject);
    if (typeof options === 'function') {
      callback = options;
    }
    if (callback) {
      emberObject.set('hasChildren', true);
      callback.call(new Navigation(emberObject.get('children'), emberObject.get('id')));
    }
    return this.container;
  }

  _makeRoute(options) {
    if (options == null) {
      options = {};
    }
    if (options.route === void 0) {
      return options.route = dasherize(options.title);
    }
  }

  _uid() {
    return Math.random().toString(36).substr(2, 9);
  }

  static findParent(obj) {
    return this.content.find((function() {
      return function(item) {
        return item.id === obj.parentId;
      };
    })(this));
  }
}
