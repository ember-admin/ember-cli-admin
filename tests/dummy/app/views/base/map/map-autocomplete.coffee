`import Ember from 'ember';`

mapAutocompleteView = Ember.TextField.extend

  keyPress: (event) ->
    if event.keyCode == 13
      event.preventDefault()

`export default mapAutocompleteView;`