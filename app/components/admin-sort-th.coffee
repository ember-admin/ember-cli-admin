`import Ember from 'ember'`

adminSortThView = Ember.Component.extend
  tagName: "th"

  isOrderAscending: Ember.computed.bool('orderAscending')

  isCurrentSortAttribute: (->
    @get('sort') is @get('attributeName')
  ).property('sort', 'attributeName')

  isInSortFields: (->
    @get('sortFields').contains(@get('attributeName'))
  ).property('sortFields', 'attributeName')
  click: ->
    this.sendAction('action', @get('attributeName'))

`export default adminSortThView`