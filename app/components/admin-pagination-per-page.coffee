`import Ember from 'ember';`

paginationPerPageView = Ember.Component.extend
  tagName: "button"
  classNames: ["btn btn-default"]
  attributeBindings: ["type"]
  classNameBindings: ["isActive:active"]

  click: ->
    this.sendAction('action', @get('count'))

  isActive:(->
    @get('perPage') == @get('count')
  ).property('perPage')

`export default paginationPerPageView;`