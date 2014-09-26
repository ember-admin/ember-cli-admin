`import Ember from 'ember'`;

buttonView = Ember.View.extend
  tagName: "button"
  classNames: ["btn btn-default"]

  action: ''

  click: ()->
    @get('controller').send(@get('action'), @get('context'))

`export default buttonView;`
