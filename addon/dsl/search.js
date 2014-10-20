import Ember from 'ember';

var SearchField;

var SearchClass = (function() {

  function Search() {
  }

  Search.prototype.fields = [];
  Search.prototype.model  = [];

  Search.prototype.form = function(searchParams, callback) {
    this.fields = [];
    this.queryParams = this.deserializer(searchParams);
    callback.call(this);
    return this;
  };

  Search.prototype.fromModel = function(model){
    var searchObject = new Search();
    searchObject.formModel(model);
    return searchObject;
  };

  Search.prototype.input = function(fieldName, options) {
    var searchObject = SearchField.create({fieldName: fieldName, options: options, query: this.queryParams});
    searchObject.input();
    this.fields.pushObject(searchObject);
    return this;
  };

  Search.prototype.autocomplete = function(fieldName, options) {
    var searchObject = SearchField.create({fieldName: fieldName, options: options, query: this.queryParams});
    searchObject.autocomplete();
    this.fields.pushObject(searchObject);
    return this;
  };

  Search.prototype.select = function(options, fieldName) {
    var searchObject = SearchField.create({fieldName: fieldName, options: options, query: this.queryParams});
    searchObject.select();
    this.fields.pushObject(searchObject);
    return this;
  };

  Search.prototype.serialize = function(){
    var q = {};
    this.fields.forEach(function(field){
      q[field.get('fieldName')] = field.serialize();
    });
    return q;
  };

  Search.prototype.deserializer = function(params){
    var digitTest = /^\d+$/,
      keyBreaker = /([^\[\]]+)|(\[\])/g,
      plus = /\+/g,
      paramTest = /([^?#]*)(#.*)?$/;
    if(!params || !paramTest.test(params)) {
      return {};
    }


    var data = {},
      pairs = params.split('&'),
      current;

    for(var i = 0; i < pairs.length; i++){
      current = data;
      var pair = pairs[i].split('=');

      // if we find foo=1+1=2
      if(pair.length !== 2) {
        pair = [pair[0], pair.slice(1).join("=")];
      }

      var key = decodeURIComponent(pair[0].replace(plus, " ")),
        value = decodeURIComponent(pair[1].replace(plus, " ")),
        parts = key.match(keyBreaker);

      for ( var j = 0; j < parts.length - 1; j++ ) {
        var part = parts[j];
        if (!current[part] ) {
          // if what we are pointing to looks like an array
          current[part] = digitTest.test(parts[j+1]) || parts[j+1] === "[]" ? [] : {};
        }
        current = current[part];
      }
      var lastPart = parts[parts.length - 1];
      if(lastPart === "[]"){
        current.pushObject(value);
      }else{
        current[lastPart] = value;
      }
    }
    return data;
  };

  return Search;

})();

SearchField = Ember.Object.extend({
  isInput: false,
  isSelect: false,
  isAutocomplete: false,
  isNumberInput: false,
  options: {},
  numberPredicats: ['=', '>=', '<='],

  init: function(){
    var fieldParams = this.get('query')[this.get('fieldName')];
    if(fieldParams){
      this.setProperties(fieldParams);
    }
  },

  input: function(){
    var options = Ember.$.extend({type: 'string'}, this.get('options'));
    this.set('options', options);

    switch(this.get('options').type) {
      case 'string':
        this.set('isInput', true);
        break;
      case 'autocomplete':
        this.autocomlete();
        break;
      case 'number':
        this.numberInput();
        break;
      case 'select':
        this.select();
        break;
      default:
        throw('search dsl doesnt has default field');
    }
  },

  numberInput: function(){
    this.set('isNumberInput', true);
  },

  select: function(){
    this.set('isSelect', true);
  },

  autocomlete: function(){
    this.set('isAutocomplete', true);
  },

  serialize: function(){
    var serialzied;
    switch(this.get('options').type){
      case 'number':
        serialzied = {name: this.get('fieldName'), value: this.get('value'), predicat: this.get('selectedPredicat')};
        break;
      default:
        serialzied = {name: this.get('fieldName'), value: this.get('value')};
        break;
    }
    return serialzied;
  }
});

export default SearchClass;