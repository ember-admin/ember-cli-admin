import Ember from 'ember';
import LetterCaselogic from 'ember-cli-admin/logics/letter-case';

export default Ember.Component.extend({
  tagName: 'span',
  text: Ember.computed('content', 'caseType', {
    get: function() {
      return LetterCaselogic.transform(this.get('content'), this.get('caseType'));
    }
  })
});
