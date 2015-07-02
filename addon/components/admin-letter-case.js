import Ember from 'ember';
import LetterCaselogic from 'ember-cli-admin/logics/letter-case';
import layout from '../templates/components/admin-letter-case';

export default Ember.Component.extend({
  layout: layout,

  tagName: 'span',

  text: Ember.computed('content', 'caseType', {
    get: function() {
      return LetterCaselogic.transform(this.get('content'), this.get('caseType'));
    }
  })
});
