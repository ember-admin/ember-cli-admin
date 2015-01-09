import Ember from 'ember';
import LetterCaselogic from 'ember-cli-admin/logics/letter-case';

export default Ember.Component.extend({
  tagName: 'span',
  text: function(){
    return LetterCaselogic.transform(this.get('content'), this.get('caseType'));
  }.property('content', 'caseType')
});