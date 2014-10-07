`import Ember from 'ember'`

imageLinkView = Ember.View.extend
  tagName: "a"

  attributeBindings: ["href"]

  href: "#"

  templateName: "admin/fileuploads/link_to_image"

  click: (e) ->
    e.preventDefault()
    throw 'implement me'
#    imageView = Ember.View.views['FileUploadModal']
#    imageView.set('image', @get('image'))
#    imageView.$().modal({})
`export default imageLinkView`