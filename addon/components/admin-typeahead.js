/*global Bloodhound*/
import Ember from 'ember';
import layout from '../templates/components/admin-typeahead';

export default Ember.TextField.extend({
  layout: layout,

  tagName: 'input',

  classNames: ['typeahead'],
  displayKey: 'value',
  hint: true,
  highlight: true,
  minLength: 1,

  //TODO: We need more customizable solution here
  ajax: Ember.computed({
    get: function() {
      var session;
      session = JSON.parse(localStorage.getItem('ember_simple_auth:session'));
      if (!session) {
        return {};
      }
      return {
        headers: {
          'Authorization': `Token user_token="${session.user_token}", user_email="${session.user_email}"`
        }
      };
    }
  }),
  bloodhound: Ember.computed({
    get: function() {
      var self, states;
      self = this;
      states = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: false,
        remote: {
          url: `${self.get('url')}?q=%QUERY`,
          ajax: this.get('ajax')
        }
      });
      states.initialize();
      return states;
    }
  }),
  initComponent: Ember.on('didInsertElement', function() {
    return this.$().typeahead(this.getProperties(['hint', 'highlight', 'minLength']), {
      displayKey: this.get('displayKey'),
      source: this.get('bloodhound').ttAdapter()
    });
  }),
  destroyComponent: Ember.on('willDestroyElement', function() {
    return this.$().typeahead('destroy');
  })
});
