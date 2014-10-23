`import Ember from 'ember'`
`import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation'`

assetView = Ember.View.extend ConfirmationMixin,
  attributeBindings: ["templateName", 'property']

  actions:

    deleteAsset: ->
      @_showConfirmation()

  _createConfirmationObject: (action) ->
    Ember.Object.create({
      actionData: action,
      model: @get('asset'),
      options: {asset: @get('assetRSVP'), single: @get('parentView.single'), property: @get('property'), withOptions: true}
    })

  action: (->
    {title: 'Delete', confirm: "Are you sure you want to delete this?", action: 'deleteAsset'}
  ).property()

  assetRSVP: (->
    new Ember.RSVP.Promise((resolve) =>
      resolve(@get('asset'))
    )
  ).property('asset')

`export default assetView`
