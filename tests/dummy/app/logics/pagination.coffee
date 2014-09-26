`import Ember from 'ember';`

pagination = Ember.Object.extend()

pagination.reopenClass
  setup: (controller, page) ->
    if page
      nextPage = page + 1
      prevPage = if page - 1 < 1 then 1 else page - 1
      controller.set('__nextPage', nextPage)
      controller.set('__prevPage', prevPage)
    else
      controller.set('__nextPage', undefined)
      controller.set('__prevPage', undefined)

`export default pagination;`