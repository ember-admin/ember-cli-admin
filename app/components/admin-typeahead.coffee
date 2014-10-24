`import Ember from 'ember';`

typeaheadComponent = Ember.TextField.extend
  classNames: ['typeahead']
  tagName: 'input'
  displayKey: 'value'
  hint: true
  highlight: true
  minLength: 1

  bloodhound:(->
    self = @
    states = new Bloodhound(
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value")
      queryTokenizer: Bloodhound.tokenizers.whitespace
      prefetch: false,
      remote: '%@?q=%QUERY'.fmt(self.get('url'))
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
