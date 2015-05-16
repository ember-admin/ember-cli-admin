import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';
export default Ember.Component.extend({
  attributeBindings: ["property", "assetTemplate"],

  didInsertElement: function() {
    var self = this;
    this.$("#sortable").sortable({
      update: function(event, ui) {
        var positions = {};
        $(this).find('.asset').each(function(i) {
          positions[$(this).data('id')] = i + 1;
        });
        var assets = self.get('assets');
        Object.keys(positions).forEach(function(id) {
          var target = assets.filter(function(asset) {
            return asset.get('id') === id;
          })[0];
          target.set(self.get('orderProperty'), positions[id]);
          return target.save();
        });
      }
    });
    return this.get('single');
  },
  assetsSorted: Ember.computed('orderProperty', 'assets.length', {
    get: function() {
      if (Ember.isEmpty(this.get('assets')) || Ember.isEmpty(this.get('orderProperty'))) {
        return this.get('assets');
      }
      return this.get('assets').toArray().sortBy(this.get('orderProperty'));
    }
  }),
  single: Ember.computed('model', {
    get: function() {
      return Attributes.isBelongsTo(this.get("model").constructor, this.get('property'));
    }
  }),
  assets: Ember.computed('_assets', {
    get: function() {
      Ember.defineProperty(this, "_assets", Ember.computed("model." + this.get('property'), {
        get: function(){
          return this.get("model." + (this.get('property')));
        }
      }));
      return this.get('_assets');
    }
  }),
  asset: Ember.computed('_asset', {
    get: function() {
      Ember.defineProperty(this, "_asset", Ember.computed("model." + this.get('property') + ".isLoaded", {
        get: function() {
          return this.get("model." + (this.get('property')));
        }
      }));
      return this.get('_asset');
    }
  }),
  assetRSVP: Ember.computed('asset', {
    get: function() {
      return new Ember.RSVP.Promise((function(_this) {
        return function(resolve) {
          return resolve(_this.get('asset'));
        };
      })(this));
    }
  }),
  actions: {
    adminAction: function(actionName, options){
        this.sendAction(this.get('adminAction'), actionName, options)
    },
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
    store = this.get('store');
    asset = store.createRecord(Ember.String.singularize(this.get('property')), $.extend({}, params));
    asset.set('file', file);
    return this.sendAction(this.get("createAssetAction"), asset, this.get('property'), this);
  },
  _params: function(file) {
    var params;
    params = {
      assetable_type: Ember.String.singularize(this.get('controllerName')).classify(),
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
