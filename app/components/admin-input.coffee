`import Ember from 'ember';`

adminInput = Ember.Component.extend

  value: ((key, value) ->
    if arguments.length > 1
      return @get('model').set(@get('name'), value)
    return @get('model').get(@get('name'))
  ).property('name', 'model')

`export default adminInput`