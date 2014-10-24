#Ember-Cli-Admin

[![Build Status](https://travis-ci.org/ember-admin/ember-cli-admin.svg?branch=master)](https://travis-ci.org/ember-admin/ember-cli-admin)

Ember-cli-admin is a powerful admin dashboard for ember-cli projects that is built on ideas of [ActiveAdmin][2] and [AbAdmin][3].

##See example

[Ember-cli-admin example app](https://github.com/ember-admin/ember-cli-example)

##Version

0.1.4

##Installation

```
npm install ember-cli-admin --save-dev
```

##Dependencies

Run ember-cli-admin generator and install dependencies:
```
ember g ember-cli-admin
npm install
bower install
```

Then in your Brocfile.js add bootstrap fonts:
```javascript
// Put the bootstrap fonts in the place that the bootstrap css expects to find them.
var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});
var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([app.toTree(), bootstrapFonts]);
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
###Actions in table

You can specify the actions in table with ```itemActions``` property in the controller:

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

Or you can put custom actions with ```additionalActions``` property in the controller:
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

###Batch Actions in table
You can specify the batch actions in table with ```batchActions``` property in the controller:
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

First add avatar model extending it from ember-cli-admin Asset:

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
Then you need to make Avatar adapter like this:

```javascript
//app/adapters/avatar.js
import FileuploadAdapterMixin from 'ember-cli-admin/mixins/fileupload-adapter';
import ApplicationAdapter from './application';

var avatar = ApplicationAdapter.extend(FileuploadAdapterMixin, {
});

export default avatar;
```
By default, FileuploadAdapterMixin provides type property for Asset equals ```Asset```.

If your backend API expect for different type request parameters property you can specify it in your asset model.

Let's say your API except Avatar type to be "Avatar", not "Asset".
You can do this by editing your Avatar model like this: 

```javascript
//app/models/avatar.js
...

var avatar = Asset.extend({
  type: DS.attr('string', {defaultValue: 'Avatar'})
});

...
```

That's it!

##Customize Templates

You can also provide your own form template for a specific resource. Put your form template in `app/templates/admin/[controllerName]` directory. For users resource:

```
#app/templates/admin/users/form.hbs
...
```

If you have `admin/form` and `admin/users/form` templates, the last will be used for your users resource, and the first for all the other resources.

##Searching

All model attributes, except relations, are available to search by in **search form** on resource index page.
For now, we render text inputs for all attributes. This will be fixed in future.

In your resource controller, you can specify search attributes that appear in this form:

```javascript
//app/controllers/users.js
...
searchForm: (function() {
  return new SearchLogic().form(this.get('q'), function() {
    this.input('email');
    this.input('name');
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

##Sorting

You can sort records on resource index page by attributes in ascending or descending order.
To specify fields for sorting, in your resource controller add `sortFields` property:
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

##Contribution
See our wiki pages on [contributing](https://github.com/ember-admin/ember-cli-admin/wiki/Contributing) and [the roadmap](https://github.com/ember-admin/ember-cli-admin/wiki/Roadmap).

##License


[Licensed under MIT license] [1]

[1]:http://opensource.org/licenses/mit-license.php
[2]:https://github.com/activeadmin/activeadmin
[3]:https://github.com/leschenko/ab_admin
[4]:https://github.com/ember-admin/ember-cli-map
