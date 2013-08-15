ember-admin
=================
Try Admin into your app:
* `gem "ember-admin", git: "git@github.com:roundscope/ember-admin.git"`
Or use `development` application

#add bootstrap
* `gem 'twitter-bootstrap-rails', git: 'git://github.com/diowa/twitter-bootstrap-rails.git', branch: "bootstrap-3.0.0"`
* `gem "less-rails"`
* `gem 'therubyracer'`


Modify for application.css

`*= require ember-admin/admin`

Modify for application.js
```
#= require jquery
#= require jquery_ujs
#= require handlebars
#= require ember
#= require ember-data


#= require twbs/bootstrap
#= require ember-admin/main
```

and run it =)
