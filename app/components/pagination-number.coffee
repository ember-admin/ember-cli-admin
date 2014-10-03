`import Ember from 'ember';`

paginationNumberView = Ember.Component.extend

  attributeBindings: ["href"]
  tagName: "a"
  classNameBindings: ["isActive:active"]
  href: '#'

  isActive:(->
    @get('page') == @get('number')
  ).property('page')

  click: (e) ->
    e.preventDefault()
    unless @get('number') == '...'
      this.sendAction('action', @get('number'))
      window.scrollTo(0,0)

`export default paginationNumberView;`