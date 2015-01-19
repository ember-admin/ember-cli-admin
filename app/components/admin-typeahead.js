import Ember from 'ember';
var typeaheadComponent;

typeaheadComponent = Ember.TextField.extend({
  classNames: ['typeahead'],
  tagName: 'input',
  displayKey: 'value',
  hint: true,
  highlight: true,
  minLength: 1,
  ajax: (function() {
    var session;
    session = JSON.parse(localStorage.getItem('ember_simple_auth:session'));
    if (!session) {
      return {};
    }
    return {
      headers: {
        'Authorization': 'Token user_token="%@", user_email="%@"'.fmt(session.user_token, session.user_email)
      }
    };
  }).property(),
  bloodhound: (function() {
    var self, states;
    self = this;
    states = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: false,
      remote: {
        url: '%@?q=%QUERY'.fmt(self.get('url')),
        ajax: this.get('ajax')
      }
    });
    states.initialize();
    return states;
  }).property(),
  initComponent: (function() {
    return this.$().typeahead(this.getProperties(['hint', 'highlight', 'minLength']), {
      displayKey: this.get('displayKey'),
      source: this.get('bloodhound').ttAdapter()
    });
  }).on('didInsertElement'),
  destroyComponent: (function() {
    return this.$().typeahead('destroy');
  }).on('willDestroyElement')
});

export default typeaheadComponent;