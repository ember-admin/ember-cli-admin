ember-admin
=================
Try Admin into your app:
* `gem "ember-admin", git: "git@github.com:roundscope/ember-admin.git"`

Modify for application.css

`*= require ember-admin/admin`

Modify for application.js
```
//Deafault rails js with jquery

//= require jquery
//= require jquery_ujs

//Defaults ember files

//= require handlebars
//= require ember
//= require ember-data

//Admin section
//= require ember-admin/main
```

Run install generator
`rails g ember_admin:install`

Then add generated folder in application.js in Admin section after `//= require ember-admin/main`

`//= require_tree ./admin`

#Use development app
* `git clone git@github.com:roundscope/ember-admin.git && cd ember-admin/development`
* `bundle`
* `rake db:create`
* `rake db:migrate`
* `rake db:seed`
* `rails s`
