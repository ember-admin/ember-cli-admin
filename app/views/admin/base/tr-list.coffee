`import Ember from 'ember'`
view = Ember.View.extend
  templateName: 'admin/base/tr-list'
  tagName: 'tr'

  item: (->
    @get('context')
  ).property('context')
`export default view`