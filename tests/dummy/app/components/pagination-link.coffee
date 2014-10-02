`import Ember from 'ember';`

paginationLinkView = Ember.Component.extend

  attributeBindings: ["href"]
  tagName: "a"

  href: '#'

  click: (e) ->
    e.preventDefault()
    this.sendAction()
    window.scrollTo(0,0)

`export default paginationLinkView;`