`import Ember from 'ember';`

paginationLinkView = Ember.View.extend

  attributeBindings: ["href"]
  tagName: "a"

  href: '#'

  click: (e) ->
    e.preventDefault()
    if @get('type') == 'next'
      @get('controller').send('nextPage')
    else
      @get('controller').send('prevPage')
    window.scrollTo(0,0)

`export default paginationLinkView;`