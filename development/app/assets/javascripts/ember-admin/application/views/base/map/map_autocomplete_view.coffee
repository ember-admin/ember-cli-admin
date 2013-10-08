Admin.Base.Views.MapAutocompleteView = Ember.TextField.extend


  keyPress: (event) ->
    if event.keyCode == 13
      event.preventDefault()