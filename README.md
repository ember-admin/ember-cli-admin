#Ember-Cli-Admin

[![Build Status](https://travis-ci.org/ember-admin/ember-cli-admin.svg?branch=master)](https://travis-ci.org/ember-admin/ember-cli-admin)
[![npm version](https://badge.fury.io/js/ember-cli-admin.svg)](http://badge.fury.io/js/ember-cli-admin)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-admin.svg)](http://emberobserver.com/addons/ember-cli-admin)

Ember-cli-admin is a powerful admin dashboard for ember-cli projects that is built on ideas of [ActiveAdmin][2] and [AbAdmin][3].

##See example

[Ember-cli-admin example](http://rails.ember-admin.com/#/products)

##Installation

```
npm install ember-cli-admin --save-dev
```

## Quick Setup Steps

### Install

Run `ember install ember-cli-admin`

Or if you're using Ember CLI between 0.2.2 and 0.1.4:

Run `ember install:addon ember-cli-admin`

Or if you're using Ember CLI 0.1.4 or older:

```
npm install ember-cli-admin --save-dev
ember g ember-cli-admin
```

### Generate

1. Run `ember g admin-app "My Awesome App Name"`
2. Run `ember g table-view-resource my-resources`

That's all!

Also you can see your [wiki](https://github.com/ember-admin/ember-cli-admin/wiki/Manual-installation) if you want more details about installation or just need to do it manually.

##Blueprints

[Ember-Cli-Admin](https://github.com/ember-admin/ember-cli-admin) provides some default blueprints.

These are:
- **admin-app** - generates basic ember-cli-admin app scaffold;
- **table-view-controller** - generates TableViewController;
- **tree-view-controller** - generates TreeViewController;
- **table-view-resource** - generates model, TableViewController and register them in MetaRouter and Navigation;
- **table-view-resource** - same as table-view-resource, but with TreeViewController and model suited for it;

##Plugins

Ember-Cli-Admin has some useful plugins that you can use to extend default dashboard functionality:

1. [Ember-Cli-Admin-Auth][5] - adds authorization to Ember-Cli-Admin

2. [Ember-Cli-Admin-Languages][6] - adds multilanguage inputs in forms

##Features overview

###Form fields

You can specify the attributes to use in admin form with ```formAttributes``` property in the controller:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.Controller.extend(TableViewController,{
  formAttributes: ['email', 'name']
});
```

###Table fields

You can specify the attributes to use in admin table with the ```tableAttributes``` property in the controller:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.Controller.extend(TableViewController,{
  tableAttributes: ['email', 'name']
});
```

###Item Actions

You can customize item actions with ```itemActions``` property in the controller:

```javascript
//app/controllers/users.js
import Ember from 'ember';
import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';

export default Ember.Controller.extend(TableViewController,{
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

export default Ember.Controller.extend(TableViewController,{
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

export default Ember.Controller.extend(TableViewController,{
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

Also, you need to define ```content_type``` property in your model. Ember-Cli-admin accepts standart MIME types and guesses how to display your assets based on it.

You can do this by editing your Avatar model like this:

```javascript
//app/models/avatar.js
...

var avatar = Asset.extend({
  type: DS.attr('string', {defaultValue: 'Avatar'}),
  content_type: DS.attr('string')
});

...
```

After that you should specify ```sortAssetsBy: 'assetOrderProperty'``` in controller.

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
isShowSearchForm: true,
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
More options for autocomplete check in `app/components/admin-typeahead.js`

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

export default Ember.Controller.extend(TreeViewController, {
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

  export default Ember.Controller.extend(TableViewController, {
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
[5]:https://github.com/ember-admin/ember-cli-admin-auth
[6]:https://github.com/ember-admin/ember-cli-admin-languages
