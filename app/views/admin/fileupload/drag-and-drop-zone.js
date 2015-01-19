import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';
var dragAndDropZoneView;

dragAndDropZoneView = Ember.View.extend({
  attributeBindings: ["property", "assetTemplate"],
  assetTemplate: "admin/fileuploads/asset",
  templateName: "admin/fileuploads/drag-and-drop-zone",
  didInsertElement: function() {
    return this.get('single');
  },
  single: (function() {
    return Attributes.isBelongsTo(this.get("model").constructor, this.get('property'));
  }).property('model'),
  assets: (function() {
    Ember.defineProperty(this, "_assets", Ember.computed(function() {
      return this.get("model." + (this.get('property')));
    }).property("model." + (this.get('property'))));
    return this.get('_assets');
  }).property('_assets'),
  asset: (function() {
    Ember.defineProperty(this, "_asset", Ember.computed(function() {
      return this.get("model." + (this.get('property')));
    }).property("model." + (this.get('property')) + ".isLoaded"));
    return this.get('_asset');
  }).property('_asset'),
  assetRSVP: (function() {
    return new Ember.RSVP.Promise((function(_this) {
      return function(resolve) {
        return resolve(_this.get('asset'));
      };
    })(this));
  }).property('asset'),
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
    var asset;
    this.set('creating', true);
    if (this.get('single')) {
      asset = this.get("model." + (this.get('property')));
      if (asset) {
        return this.get('assetRSVP').then((function(_this) {
          return function(asset) {
            if (asset) {
              asset.destroyRecord();
            }
            return _this._createAsset(_this._params(file), file);
          };
        })(this));
      } else {
        return this._createAsset(this._params(file), file);
      }
    } else {
      return this._createAsset(this._params(file), file);
    }
  },
  _createAsset: function(params, file) {
    var asset, store;
    store = this.get('controller.store');
    asset = store.createRecord(Ember.String.singularize(this.get('property')), $.extend({}, params));
    asset.set('file', file);
    return this.get('controller').send("createAsset", asset, this.get('property'), this);
  },
  _params: function(file) {
    var params;
    params = {
      assetable_type: Ember.String.singularize(this.get('controller._name')).classify(),
      content_type: file.type,
      original_filename: file.name,
      is_main: true
    };
    if (this.get('model.id')) {
      params.assetable_id = this.get('model.id');
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

export default dragAndDropZoneView;