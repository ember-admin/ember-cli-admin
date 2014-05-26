Ember.TEMPLATES["ember-admin/_form_buttons"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.submit || (depth0 && depth0.submit),options={hash:{
    'class': ("btn btn-default")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "submit", options))));
  data.buffer.push("<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", false, {hash:{
    'on': ("click")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","BOOLEAN"],data:data})));
  data.buffer.push(" class=\"btn btn-primary\">Save and edit</button><button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{
    'on': ("click")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn btn-warning\">Cancel</button>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/actions"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.view.call(depth0, "Admin.Base.Views.ActionView", {hash:{
    'tagName': ("button"),
    'href': ("#"),
    'breadcrumbActionBinding': ("action"),
    'controllerBinding': ("controller")
  },hashTypes:{'tagName': "STRING",'href': "STRING",'breadcrumbActionBinding': "STRING",'controllerBinding': "STRING"},hashContexts:{'tagName': depth0,'href': depth0,'breadcrumbActionBinding': depth0,'controllerBinding': depth0},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "view.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "action", "in", "controller.breadcrumbsActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"wrapper\">");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "base/modals", options) : helperMissing.call(depth0, "partial", "base/modals", options))));
  data.buffer.push("<div class=\"row\"><div class=\"col-12\">");
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "navigation", options) : helperMissing.call(depth0, "outlet", "navigation", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div></div><div class=\"row breadcrumbs\"><div class=\"col-12\">");
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "actions", options) : helperMissing.call(depth0, "outlet", "actions", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "breadcrumbs", options) : helperMissing.call(depth0, "outlet", "breadcrumbs", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div></div><div id=\"container\" class=\"row-fluid\"><div class=\"wrap_content main-content\">");
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "main", options) : helperMissing.call(depth0, "outlet", "main", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div></div><div class=\"row\"><div class=\"col-12\">");
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "footer", options) : helperMissing.call(depth0, "outlet", "footer", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div></div></div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/base/_geo"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("Geo Input<div class=\"geo_input\">");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Base.Views.MapAutocompleteView", {hash:{
    'viewName': ("MapAutocomplete")
  },hashTypes:{'viewName': "STRING"},hashContexts:{'viewName': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div><div id=\"map_container\" class=\"map\"></div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/base/_modals"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\">");
  stack1 = helpers._triageMustache.call(depth0, "view.action.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4></div><div class=\"modal-body\"><p>");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.action.confirm", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button><button type=\"button\" class=\"btn btn-primary\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirm", {hash:{
    'target': ("view.target"),
    'on': ("click")
  },hashTypes:{'target': "STRING",'on': "STRING"},hashContexts:{'target': depth0,'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Confirm</button></div></div></div>");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\"></h4></div><div class=\"modal-body\"><img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("view.image.url")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" /></div><div class=\"modal-footer\"></div></div></div>");
  return buffer;
  }

  stack1 = helpers.view.call(depth0, "Ember.View", {hash:{
    'elementId': ("ActionModal"),
    'class': ("modal fade")
  },hashTypes:{'elementId': "STRING",'class': "STRING"},hashContexts:{'elementId': depth0,'class': depth0},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers.view.call(depth0, "Ember.View", {hash:{
    'class': ("file_upload modal fade"),
    'elementId': ("FileUploadModal")
  },hashTypes:{'class': "STRING",'elementId': "STRING"},hashContexts:{'class': depth0,'elementId': depth0},inverse:self.program(3, program3, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/base/_pagination"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"btn-group per-page\">");
  stack1 = (helper = helpers['query-params'] || (depth0 && depth0['query-params']),options={hash:{
    'perPage': (25)
  },hashTypes:{'perPage': "INTEGER"},hashContexts:{'perPage': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "query-params", options));
  data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","sexpr"],data:data},helper ? helper.call(depth0, "25", stack1, options) : helperMissing.call(depth0, "link-to", "25", stack1, options))));
  data.buffer.push("&nbsp;");
  stack1 = (helper = helpers['query-params'] || (depth0 && depth0['query-params']),options={hash:{
    'perPage': (50)
  },hashTypes:{'perPage': "INTEGER"},hashContexts:{'perPage': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "query-params", options));
  data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","sexpr"],data:data},helper ? helper.call(depth0, "50", stack1, options) : helperMissing.call(depth0, "link-to", "50", stack1, options))));
  data.buffer.push("&nbsp;");
  stack1 = (helper = helpers['query-params'] || (depth0 && depth0['query-params']),options={hash:{
    'perPage': (100)
  },hashTypes:{'perPage': "INTEGER"},hashContexts:{'perPage': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "query-params", options));
  data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","sexpr"],data:data},helper ? helper.call(depth0, "100", stack1, options) : helperMissing.call(depth0, "link-to", "100", stack1, options))));
  data.buffer.push("</div><ul class=\"pager\"><li>");
  stack1 = (helper = helpers['query-params'] || (depth0 && depth0['query-params']),options={hash:{
    'page': (1)
  },hashTypes:{'page': "INTEGER"},hashContexts:{'page': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "query-params", options));
  data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","sexpr"],data:data},helper ? helper.call(depth0, "Previous", stack1, options) : helperMissing.call(depth0, "link-to", "Previous", stack1, options))));
  data.buffer.push("</li><li>");
  stack1 = (helper = helpers['query-params'] || (depth0 && depth0['query-params']),options={hash:{
    'page': (2)
  },hashTypes:{'page': "INTEGER"},hashContexts:{'page': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "query-params", options));
  data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","sexpr"],data:data},helper ? helper.call(depth0, "Next", stack1, options) : helperMissing.call(depth0, "link-to", "Next", stack1, options))));
  data.buffer.push("</li></ul><div class=\"page-number\">Page&nbsp;");
  stack1 = helpers._triageMustache.call(depth0, "controller.page", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/base/_table"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<th>");
  stack1 = helpers._triageMustache.call(depth0, "attributeName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</th>");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("<tr><td>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Base.Views.CheckboxBatchView", {hash:{
    'contextBinding': ("item")
  },hashTypes:{'contextBinding': "STRING"},hashContexts:{'contextBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</td>");
  stack1 = helpers.each.call(depth0, "attributeName", "in", "controller.tableAttributes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<td class=\"actions\">");
  stack1 = helpers['if'].call(depth0, "controller.collectionActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "base/actions/_addition_actions", options) : helperMissing.call(depth0, "partial", "base/actions/_addition_actions", options))));
  data.buffer.push("</td></tr>");
  return buffer;
  }
function program6(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Base.Views.Table.TdView", {hash:{
    'contextBinding': ("item"),
    'attributeNameBinding': ("attributeName")
  },hashTypes:{'contextBinding': "STRING",'attributeNameBinding': "STRING"},hashContexts:{'contextBinding': depth0,'attributeNameBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program8(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "base/actions/_base_actions", options) : helperMissing.call(depth0, "partial", "base/actions/_base_actions", options))));
  }

function program10(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "controller.model.items.isLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program11(depth0,data) {
  
  
  data.buffer.push("<tr><td><span class=\"glyphicon glyphicon-exclamation-sign\">Empty</span></td></tr>");
  }

function program13(depth0,data) {
  
  
  data.buffer.push("<tr><td><span class=\"glyphicon glyphicon-refresh glyphicon-refresh\"></span></td></tr>");
  }

  data.buffer.push("<table class=\"table-striped\">");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "base/actions/_batch_actions", options) : helperMissing.call(depth0, "partial", "base/actions/_batch_actions", options))));
  data.buffer.push("<thead><tr><th>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Base.Views.CheckboxBatchView", {hash:{
    'selectAll': (true),
    'elementId': ("select-all-batches")
  },hashTypes:{'selectAll': "BOOLEAN",'elementId': "STRING"},hashContexts:{'selectAll': depth0,'elementId': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</th>");
  stack1 = helpers.each.call(depth0, "attributeName", "in", "controller.tableAttributes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<th>Actions</th></tr></thead><tbody>");
  stack1 = helpers.each.call(depth0, "item", "in", "controller.model.items", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</tbody></table>");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "base/_pagination", options) : helperMissing.call(depth0, "partial", "base/_pagination", options))));
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/base/_td_template"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Fileupload.ImageLinkView", {hash:{
    'imageBinding': ("view.image_object")
  },hashTypes:{'imageBinding': "STRING"},hashContexts:{'imageBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "view.value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

  stack1 = helpers['if'].call(depth0, "view.image", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers['if'].call(depth0, "view.text", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/base/actions/_addition_actions"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.view.call(depth0, "Admin.Base.Views.ActionView", {hash:{
    'tagName': ("button"),
    'href': ("#"),
    'contextBinding': ("action"),
    'modelBinding': ("item"),
    'titleBinding': ("action.title")
  },hashTypes:{'tagName': "STRING",'href': "STRING",'contextBinding': "STRING",'modelBinding': "STRING",'titleBinding': "STRING"},hashContexts:{'tagName': depth0,'href': depth0,'contextBinding': depth0,'modelBinding': depth0,'titleBinding': depth0},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("action.iconClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span>");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "action", "in", "controller.additionalActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/base/actions/_base_actions"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.view.call(depth0, "Admin.Base.Views.ActionView", {hash:{
    'tagName': ("button"),
    'href': ("#"),
    'contextBinding': ("action"),
    'modelBinding': ("item"),
    'titleBinding': ("action.title")
  },hashTypes:{'tagName': "STRING",'href': "STRING",'contextBinding': "STRING",'modelBinding': "STRING",'titleBinding': "STRING"},hashContexts:{'tagName': depth0,'href': depth0,'contextBinding': depth0,'modelBinding': depth0,'titleBinding': depth0},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("action.iconClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span>");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "action", "in", "controller.collectionActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/base/actions/_batch_actions"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.view.call(depth0, "Admin.Base.Views.BatchActionView", {hash:{
    'contextBinding': ("action")
  },hashTypes:{'contextBinding': "STRING"},hashContexts:{'contextBinding': depth0},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<a href=\"#\">");
  stack1 = helpers._triageMustache.call(depth0, "action.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<div class=\"btn-group batch-actions\"><a href=\"#\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\">batch actions<span class=\"caret\"></span></a><ul class=\"dropdown-menu\">");
  stack1 = helpers.each.call(depth0, "action", "in", "controller.batchActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</ul></div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/breadcrumbs"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "breadcrumb.active", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<li class=\"breadcrumb.class\">");
  stack1 = helpers._triageMustache.call(depth0, "breadcrumb.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<li class=\"breadcrumb.class\"><a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("breadcrumb.url")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "breadcrumb.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<ul class=\"breadcrumb\">");
  stack1 = helpers.each.call(depth0, "breadcrumb", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</ul>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/dashboard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Dashboard</h1>");
  
});

Ember.TEMPLATES["ember-admin/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing;


  data.buffer.push("<h1>Edit</h1>");
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "form", options) : helperMissing.call(depth0, "outlet", "form", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/fileuploads/asset"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"asset\"><img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("view.asset.thumb_url")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" /><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteAsset", {hash:{
    'target': ("view"),
    'on': ("click")
  },hashTypes:{'target': "STRING",'on': "STRING"},hashContexts:{'target': depth0,'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn btn-danger\">x</a></div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/fileuploads/drag_and_drop_zone"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "view.asset", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Fileupload.AssetView", {hash:{
    'templateNameBinding': ("view.assetTemplate"),
    'assetBinding': ("view.asset"),
    'propertyBinding': ("view.property")
  },hashTypes:{'templateNameBinding': "STRING",'assetBinding': "STRING",'propertyBinding': "STRING"},hashContexts:{'templateNameBinding': depth0,'assetBinding': depth0,'propertyBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program6(depth0,data) {
  
  var stack1;
  stack1 = helpers.each.call(depth0, "asset", "in", "view.assets", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program7(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Fileupload.AssetView", {hash:{
    'templateNameBinding': ("view.assetTemplate"),
    'assetBinding': ("asset"),
    'propertyBinding': ("view.property")
  },hashTypes:{'templateNameBinding': "STRING",'assetBinding': "STRING",'propertyBinding': "STRING"},hashContexts:{'templateNameBinding': depth0,'assetBinding': depth0,'propertyBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program9(depth0,data) {
  
  
  data.buffer.push("<span class=\"glyphicon glyphicon-refresh glyphicon-refresh\"></span>");
  }

  data.buffer.push("<div class=\"asset_wrapper\">");
  stack1 = helpers['if'].call(depth0, "view.single", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<input ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectFile", {hash:{
    'target': ("view"),
    'on': ("change")
  },hashTypes:{'target': "STRING",'on': "STRING"},hashContexts:{'target': depth0,'on': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" type=\"file\" />");
  stack1 = helpers['if'].call(depth0, "view.creating", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/fileuploads/link_to_image"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("view.image.thumb_url")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" title=\"Show image\" />");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "view.image", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/form"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  stack1 = helpers.each.call(depth0, "attribute", "in", "controller.formAttributes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers.each.call(depth0, "attribute", "in", "controller.fileuploads", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers._triageMustache.call(depth0, "input-map", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "form_buttons", options) : helperMissing.call(depth0, "partial", "form_buttons", options))));
  return buffer;
  }
function program2(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers['bound-input'] || (depth0 && depth0['bound-input']),options={hash:{
    'inputConfig': ("class:form-control")
  },hashTypes:{'inputConfig': "STRING"},hashContexts:{'inputConfig': depth0},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "attribute.name", options) : helperMissing.call(depth0, "bound-input", "attribute.name", options))));
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program6(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers['bound-fileupload'] || (depth0 && depth0['bound-fileupload']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "attribute.name", options) : helperMissing.call(depth0, "bound-fileupload", "attribute.name", options))));
  }

  stack1 = (helper = helpers['form-for'] || (depth0 && depth0['form-for']),options={hash:{
    'wrapper': ("twitter-bootstrap")
  },hashTypes:{'wrapper': "STRING"},hashContexts:{'wrapper': depth0},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "controller.model", options) : helperMissing.call(depth0, "form-for", "controller.model", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "base/_table", options) : helperMissing.call(depth0, "partial", "base/_table", options))));
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "controller.__table", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/navigation"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "navigation/item", options) : helperMissing.call(depth0, "partial", "navigation/item", options))));
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<div class=\"navbar navbar-inverse navbar-fixed-top\"><a class=\"navbar-brand\" href=\"/#/\">");
  stack1 = helpers._triageMustache.call(depth0, "Admin.Logics.Config.siteTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a><ul class=\"nav navbar-nav\">");
  stack1 = helpers.each.call(depth0, "navigation", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</ul><ul class=\"nav navbar-nav pull-right\">");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "navigation/user", options) : helperMissing.call(depth0, "partial", "navigation/user", options))));
  data.buffer.push("</ul></div>");
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/navigation/_collection"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">");
  stack1 = helpers._triageMustache.call(depth0, "navigation.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<span class=\"caret\"></span></a><ul class=\"dropdown-menu\">");
  stack1 = helpers.each.call(depth0, "navigation", "in", "navigation.children", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</ul>");
  return buffer;
  }
function program2(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "navigation/item", options) : helperMissing.call(depth0, "partial", "navigation/item", options))));
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = helpers.view.call(depth0, "Admin.NavigationContentView", {hash:{
    'class': ("dropdown"),
    'contextBinding': ("navigation")
  },hashTypes:{'class': "STRING",'contextBinding': "STRING"},hashContexts:{'class': depth0,'contextBinding': depth0},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["ember-admin/navigation/_item"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("<li class=\"divider\"></li>");
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program5(depth0,data) {
  
  var helper, options;
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "navigation/collection", options) : helperMissing.call(depth0, "partial", "navigation/collection", options))));
  }

function program7(depth0,data) {
  
  var stack1;
  stack1 = helpers.view.call(depth0, "Admin.NavigationContentView", {hash:{
    'contextBinding': ("navigation")
  },hashTypes:{'contextBinding': "STRING"},hashContexts:{'contextBinding': depth0},inverse:self.program(3, program3, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("view.url")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "navigation.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "navigation.divider", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  stack1 = helpers['if'].call(depth0, "navigation.hasChildren", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/navigation/_user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["ember-admin/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing;


  data.buffer.push("<h2>New");
  stack1 = helpers._triageMustache.call(depth0, "controller.__type", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>");
  stack1 = (helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "form", options) : helperMissing.call(depth0, "outlet", "form", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["ember-admin/show"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<tr><th>");
  stack1 = helpers._triageMustache.call(depth0, "attribute.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</th>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Admin.Base.Views.Table.TdView", {hash:{
    'contextBinding': ("model"),
    'attributeNameBinding': ("attribute.name")
  },hashTypes:{'contextBinding': "STRING",'attributeNameBinding': "STRING"},hashContexts:{'contextBinding': depth0,'attributeNameBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</tr>");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<h2>Show</h2><table class=\"show-details\"><tbody>");
  stack1 = helpers.each.call(depth0, "attribute", "in", "controller.formAttributes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</tbody></table>");
  return buffer;
  
});