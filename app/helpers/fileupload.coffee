`import Ember from 'ember';`
`import DragAndDropZoneView from 'dummy/views/fileupload/drag-and-drop-zone';`

fileupload = Ember.Handlebars.registerHelper "fileupload", (property, options) ->
  options.hash.inputOptions = Ember.copy(options.hash)
  options.hash.property = property
  return Ember.Handlebars.helpers.view.call(this, DragAndDropZoneView, options)

boundFileupload = Ember.Handlebars.registerBoundHelper "bound-fileupload", (property, options) ->
  options.hash.inputOptions = Ember.copy(options.hash);
  options.hash.property = property;
  return Ember.Handlebars.helpers.view.call(this, DragAndDropZoneView, options);

`export { fileupload, boundFileupload};`