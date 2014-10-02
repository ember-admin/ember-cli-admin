#`import Ember from 'ember';`
#
#paginationNumberView = Ember.View.extend
#
#  attributeBindings: ["href"]
#  tagName: "a"
#  classNameBindings: ["isActive:active"]
#  href: '#'
#
#  isActive:(->
#    @get('controller.page') == @get('number')
#  ).property('controller.page')
#
#  click: (e) ->
#    e.preventDefault()
#    unless @get('number') == '...'
#      @get('controller').send('changePage',@get('number'))
#      window.scrollTo(0,0)
#
#`export default paginationNumberView;`