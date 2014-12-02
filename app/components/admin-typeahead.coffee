`import Ember from 'ember';`

typeaheadComponent = Ember.TextField.extend
  classNames: ['typeahead']
  tagName: 'input'
  displayKey: 'value'
  hint: true
  highlight: true
  minLength: 1
  ajax: (->
    session = JSON.parse(localStorage.getItem('ember_simple_auth:session'))
    return {} unless session
    {headers: {'Authorization': 'Token user_token="%@", user_email="%@"'.fmt(session.user_token, session.user_email)}}
  ).property()

  bloodhound:(->
    self = @
    console.log @get('ajax')
    states = new Bloodhound(
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value")
      queryTokenizer: Bloodhound.tokenizers.whitespace
      prefetch: false,
      remote: {url: '%@?q=%QUERY'.fmt(self.get('url')), ajax: @get('ajax')}
    )
    states.initialize()
    states
  ).property()

  initComponent: (->
    @$().typeahead(@getProperties(['hint', 'highlight', 'minLength']),
      {
        displayKey: @get('displayKey'),
        source: @get('bloodhound').ttAdapter()
      })
  ).on('didInsertElement')

  destroyComponent:(->
    @$().typeahead('destroy')
  ).on('willDestroyElement')

`export default typeaheadComponent`
