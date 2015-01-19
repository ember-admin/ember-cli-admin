#Ember-Cli-Admin

[![Build Status](https://travis-ci.org/ember-admin/ember-cli-admin.svg?branch=master)](https://travis-ci.org/ember-admin/ember-cli-admin)
[![npm version](https://badge.fury.io/js/ember-cli-admin.svg)](http://badge.fury.io/js/ember-cli-admin)

Ember-cli-admin is a powerful admin dashboard for ember-cli projects that is built on ideas of [ActiveAdmin][2] and [AbAdmin][3].

##See example

[Ember-cli-admin example](http://rails.ember-admin.com/#/products)

##Version

0.4.1

##Installation

```
npm install ember-cli-admin --save-dev
```

##Quick Setup Steps

1.`npm install ember-cli-admin --save-dev`

2.`ember g ember-cli-admin`

3.`ember g admin-app "My Awesome App Name"`

4.`ember g table-view-resource my-resources`

##Blueprints

[Ember-Cli-Admin](https://github.com/ember-admin/ember-cli-admin) provides some default blueprints.

These are:
- **admin-app** - generates basic ember-cli-admin app scaffold;
- **table-view-controller** - generates TableViewController;
- **tree-view-controller** - generates TreeViewController;
- **table-view-resource** - generates model, TableViewController and register them in MetaRouter and Navigation;
- **table-view-resource** - same as table-view-resource, but with TreeViewController and model suited for it;

##Dependencies

Run ember-cli-admin generator and install dependencies:
```
ember g ember-cli-admin
```

Then in your Brocfile.js add bootstrap fonts:
```javascript
// Put the bootstrap fonts where the bootstrap css expects to find them.
var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});
var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([app.toTree(), bootstrapFonts]);
```

Also make sure that your styles in app/styles have proper extensions if an attempt to start the server results in:

```
app/styles/app.[scss/sass does not exist]
```


##Setup

###In your app.js


Add ```AdminResolver```:
```javascript
...
//app/app.js
import AdminResolver from 'ember-cli-admin/admin-resolver';
App = Ember.Application.extend({
  Resolver: AdminResolver
});
...

export default App;
```

###In your router.js

```javascript
//app/router.js
---
import MetaRoute from 'ember-cli-admin/dsl/meta-route';
var Router;

Router = Ember.Router.extend({
  ...
});

Router.map(function() {
  return this.route("dashboard", {path: "/"});
});

MetaRoute.map(Router, function() {
  // we'll add routes for our resources here in the next step
});

export default Router;
```

###Add admin/index template to your application template:
```handlebars
//application.hbs
{{partial 'admin/index'}}
```

###Add routes/main.js in our routes:
```javascript
//routes/main.js
import Ember from 'ember';
import BaseAdminRouteMixin from 'ember-cli-admin/mixins/routes/base';

var mainRoute = Ember.Route.extend(BaseAdminRouteMixin);
export default mainRoute;
```

###Now let's set up resources

For example, if we have the following model:

```javascript
//app/models/user.js
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  updated_at: DS.attr('string'),
  created_at: DS.attr('string')
});

```
To add users resource to admin dashboard, just set up users controller like this:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.ObjectController.extend(TableViewController);

```
And add resources to your router:

```javascript
//app/router.js
...
MetaRoute.map(Router, function() {
  this.resources("users");
});
...
```

You'll also need to add Navigation initializer to set up your navigation bar:

```javascript
//app/initializers/navigation.js

import Navigation from 'ember-cli-admin/dsl/navigation';

export default {
  name: 'navigation',
  initialize: function(container, app) {
    return Navigation.map(function() {
        //Dashboard page
        //You can override this if you don't use dashboard
      this.navigate("Dashboard", { route: "dashboard" });
      this.navigate("Admin", function() {
        return this.navigate("Users");
      });
    });
  }
};

```
###Form fields

You can specify the attributes to use in admin form with ```formAttributes``` property in the controller:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.ObjectController.extend(TableViewController,{
  formAttributes: ['email', 'name']
});
```

###Table fields

You can specify the attributes to use in admin table with the ```tableAttributes``` property in the controller:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.ObjectController.extend(TableViewController,{
  tableAttributes: ['email', 'name']
});
```

###Item Actions

You can customize item actions with ```itemActions``` property in the controller:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.ObjectController.extend(TableViewController,{
  itemActions: [{title: "Edit",
      "class": "btn btn-small btn-primary",
      action: "edit",
      iconClass: "glyphicon glyphicon-pencil"}]
});
```

Or you can add custom actions with ```additionalActions``` property in the controller:
```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.ObjectController.extend(TableViewController,{
  additionalActions: [{title: "my action", class: "btn my-action-css", action: "my"}],
  actions: {
    my: function(model){
        return alert('hi!');
    }
  }
});
```

Maybe you have model depends actions, so you can add in your model:
Or you can add custom actions with ```additionalActions``` property in the model:
```javascript
//app/models/user.js
additionalActions: function(){
    var actions = [];
    if(this.get('is_active')){
      actions.pushObject({title: "Toggle Active", class: "btn btn-small btn-warning", action: "toggleActive", iconClass: "glyphicon glyphicon-remove"});
    }
    else{
      actions.pushObject({title: "Toggle Active", class: "btn btn-small btn-green", action: "toggleActive", iconClass: "glyphicon glyphicon-ok"});
    }
    return actions;
  }.property('is_active')
```

###Batch Actions
You can specify the batch actions with ```batchActions``` property in the controller:
```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.ObjectController.extend(TableViewController,{
  batchActions: [{title: "my action", confirm: "Are you sure you to do it", action: "my"}],
  actions: {
    my: function(model){
        return alert('hi!');
    }
  }
});
```
###Ember-cli-admin also uses [ember-cli-map][4]

We currently support ```google-map``` component which can be added to your resource form with the following simple setup

```javascript
//app/models/user.js
...
export default DS.Model.extend({
  ...
  lat:                        DS.attr('number')
  long:                       DS.attr('number')
  zoom:                       DS.attr('number')

  asGoogleMap: ['lat', 'long', 'zoom']

});
```

And don't forget to add Google Maps to your ```index.html```
```
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key={your API key}&libraries=places">
  </script>
```

For more info see [ember-cli-map README][4].

###Fileuploads

Say, our user has one main avatar and/or many avatar pictures.

To display and upload them in admin interface, do the following setup.

First add avatar model, extending it from ember-cli-admin Asset:

```javascript
//app/models/avatar.js
import Asset from 'ember-cli-admin/logics/asset';
import DS from 'ember-data';

export default Asset.extend();
```

Add avatar/avatars to User model, and specify them on ```fileuploads``` property:

```javascript
//app/models/user.js
...
export default DS.Model.extend({
  ...
  avatar:                     DS.belongsTo('avatar'),
  avatars:                    DS.hasMany('avatar', {async: true}),

  fileuploads: ["avatar", "avatars"]
});
```
Then add an Avatar adapter like this:

```javascript
//app/adapters/avatar.js
import FileuploadAdapterMixin from 'ember-cli-admin/mixins/fileupload-adapter';
import ApplicationAdapter from './application';

var avatar = ApplicationAdapter.extend(FileuploadAdapterMixin, {
});

export default avatar;
```
By default, FileuploadAdapterMixin Asset type property is ```Asset```.

If your backend API expect for different type request parameters property you can specify it in your asset model.

Let's say your API excepts Avatar type to be "Avatar", not "Asset".
You can do this by editing your Avatar model like this:

```javascript
//app/models/avatar.js
...

var avatar = Asset.extend({
  type: DS.attr('string', {defaultValue: 'Avatar'})
});

...
```


###Set title
By default, navigation bar title display your application's module prefix. You can change this to any name of you choice by adding 'appName' property to your application config file.

Here you can also change where the title link actually points to via 'titleLinksTo' property. If this property is not set, it will point to the root URL by default.

```javascript
//config/environment.js
...
var ENV = {
  ...
  EmberENV: {
    appName: 'application name of your choice',
    titleLinksTo: '/example/url/'
    ...
    }
  ...
  }
```

That's it!

##Customize Templates

You can also provide your own template for the show, edit and new actions. These can override the global defaults as well as for specific resources.

###Global Overrides

Put your template in the `app/templates/admin` directory. For example:
```
#app/templates/admin/show.hbs
#app/templates/admin/new.hbs
#app/templates/admin/edit.hbs
#app/templates/admin/form.hbs
```

###Resource Specific Override

Put your template in `app/templates/[controllerName]` directory. For users resource:
```
#app/templates/users/show.hbs
#app/templates/users/new.hbs
#app/templates/users/edit.hbs
```

If you have `admin/new.hbs` and `users/new.hbs` templates, the latter will be used for your users resource, and the first for all the other resources.

##Searching

All model attributes, except of relations, are searchable in **search form** on resource index page.
For now, we render text inputs for all attributes. This will be fixed in future.

In your resource controller, you can specify search attributes that appear in this form:

```javascript
//app/controllers/users.js
...
searchForm: (function() {
  return new SearchLogic().form(this.get('q'), function() {
    this.input('email');
    this.input('name', {type: 'autocomplete', url: '/api/users/autocomplete'});
    this.input('price', {type: 'number'});
  });
}).property('q')
...
```

You can also provide your own search form template:
```
#app/templates/admin/search.hbs
...
```
More options for autocomplete check in `app/components/admin-typeahead.coffee`

##Sorting

You can sort records on resource index page by attributes in ascending or descending order.
To specify fields for sorting, add `sortFields` property in your resource controller:
```javascript
//app/controllers/users.js
import SearchLogic from 'ember-cli-admin/dsl/search'
...
  sortFields: ['id', 'name'],
...
```

##Sidebar
You can put sidebar for each resource:
```javascript
//app/controllers/users.js
...
  isShowSidebar: true,
  sidebarTitle: 'Hi i am sidebar',
  sidebarContent: '<p>Some Content</p>'
...
```
You can also provide your own sidebar template:
```
#app/templates/users/sidebar.hbs
...
```

###Nested Tree View
You can display **nested trees** of records in Ember-Cli-Admin.
They are implemented following the [nested set model pattern](http://en.wikipedia.org/wiki/Nested_set_model).

In your model:
```javascript
//app/models/catalogue.js
...
export default DS.Model.extend({
  name: DS.attr('string'),
  parent_id: DS.attr('number'), //necessary

  catalogues: DS.hasMany('catalogue', {async: true, inverse: null}),

  children: Ember.computed.alias('catalogues'),        //necessary

  rebuildUrl: function(){
     return '/api/v1/catalogues';   //necessary
  }.property()

});
```

Add `TreeViewController` Mixin to your resource controller:
```javascript
//app/controllers/catalogues.js
import TreeViewController from 'ember-cli-admin/mixins/controllers/tree-view';

export default Ember.ObjectController.extend(TreeViewController, {
  formAttributes: ['name']
});
```

##Show/hide table column
You can chose what table columns to display via table settings icon next to the 'Batch actions' button in the table header.

Each controller has its own set of table settings that persist via browser local storage.

##Integration with [elasticsearch](http://www.elasticsearch.org/)
Now you can integrate admin with elasticsearch server. You need use [elasticsearch adapter](https://github.com/api-hogs/ember-data-elasticsearch-kit/blob/master/dist/ember-data-elasticsearch-kit.js) download into vendor and import it to app.
Then you need turn CORS in elasticsearch, and create resource route:
```javascript
  //routes/users.js

  /* global EDEK*/
  import Ember from 'ember';
  import BaseAdminRouteMixin from 'ember-cli-admin/mixins/routes/base';
  import ElasticSearch from 'ember-cli-admin/mixins/routes/elasticsearch';

  BaseAdminRouteMixin.reopen(ElasticSearch);

  export default Ember.Route.extend(BaseAdminRouteMixin, {

    //you need implement this method for ES search
    _queryElasticsearch: function(query, params){
      var fields = [];
      var text = "";
      for (var value in params){
        fields.pushObject(value);
        text += params[value].value;
      }

      if(fields.length === 0){
        return query;
      }

      return  EDEK.QueryDSL.query(function(){
        return this.flt({
          fields: fields,
          like_text: text,
          max_query_terms: 12
        });
      });
    }
  });
```

##Change case for text in table, breadcrumbs, searchbar, etc.

You can change how text is dispayed in table, breadcrumbs, searchbar, etc.

To do this you should specify `caseType` property in controller.

For example,

```javascript
  //controllers/users.js

  import TableViewController from 'ember-cli-admin/mixins/controllers/table-view'

  export default Ember.ObjectController.extend(TableViewController, {
    caseType: 'title'
  });
```
You have these options for case changing by default:

- `title`
- `upper`
- `lower`

By default all text is lowercased.

For breadcrumbs:
```javascript
//config/environment.js
...
var ENV = {
  ...
  EmberENV: {
    appName: 'application name of your choice',
    titleLinksTo: '/example/url/',
    caseType: 'title'
    ...
    }
  ...
  }
```
##Contribution
See our wiki pages on [contributing](https://github.com/ember-admin/ember-cli-admin/wiki/Contributing) and [the roadmap](https://github.com/ember-admin/ember-cli-admin/wiki/Roadmap).

##License


[Licensed under MIT license] [1]

[1]:http://opensource.org/licenses/mit-license.php
[2]:https://github.com/activeadmin/activeadmin
[3]:https://github.com/leschenko/ab_admin
[4]:https://github.com/ember-admin/ember-cli-map
