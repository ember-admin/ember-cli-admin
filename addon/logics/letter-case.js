import Ember from 'ember';

var letterCase = Ember.Object.extend();

letterCase.reopenClass({
  _firstLetterUpper: function(str) {
    return str && str.toLowerCase().replace(/(^| )(\w)/g, function(x) {
      return x.toUpperCase();
    });
  },
  titlize: function(str) {
    if(!str){
      return '';
    }
    return this._firstLetterUpper(str.replace(/(\-)|(_)/g, " "));
  },
  transform: function(text, caseType){
    switch(caseType) {
      case 'lower':
        return text.toLowerCase();
      case 'upper':
        return text.replace(/_/g, ' ').toUpperCase();
      case 'title':
        return this.titlize(text);
      default:
        return text;
    }
  }
});

export default letterCase;
