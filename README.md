ember-rails-admin
=================
Try Admin:
* `gem "ember-rails-admin", git: "git@github.com:roundscope/ember-rails-admin.git"`

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
