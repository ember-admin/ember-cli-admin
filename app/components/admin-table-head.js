import Ember from 'ember';
import LetterCaselogic from 'ember-cli-admin/logics/letter-case';

export default Ember.Component.extend({
  tagName: "thead",
  attrs: function(){
    if(this.get('useFirstLetterUpper')){
     return this.get('activeTableAttributes').map(function(el){
        return LetterCaselogic.titlize(el);
      });
    }
    else {
      return this.get('activeTableAttributes')
    }
  }.property('activeTableAttributes'),
  actions: {
    sort: function(attributeName){
      this.sendAction('action', attributeName);
    }
  }
});