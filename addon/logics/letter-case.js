import Ember from 'ember';

var letterCase = Ember.Object.extend();

letterCase.reopenClass({
  firstLetterUpper: function(str) {
    return str && str.toLowerCase().replace(/(^| )(\w)/g, function(x) {
      return x.toUpperCase();
    });
  },
  titlize: function(str) {
    return this.firstLetterUpper(str.replace(/(\-)/g, " "));
  }
});

export default letterCase;