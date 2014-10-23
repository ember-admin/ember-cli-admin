`import Ember from 'ember'`

adminSortThView = Ember.Component.extend
  tagName: "th"
  classNameBindings: ["isActive:active"]

  isInSortFields: (->
    @get('sortFields').contains(@get('attributeName'))
  ).property('sortFields', 'attributeName')
  click: ->
    this.sendAction('action', @get('attributeName'))

#  isActive:(->
#
#  ).property()

`export default adminSortThView`