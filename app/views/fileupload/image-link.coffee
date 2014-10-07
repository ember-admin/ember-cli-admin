`import Ember from 'ember'`

imageLinkView = Ember.View.extend
  tagName: "a"

  attributeBindings: ["href"]

  href: "#"

  templateName: "fileuploads/link_to_image"

  click: (e) ->
    e.preventDefault()
    imageView = Ember.View.views['FileUploadModal']
    imageView.set('image', @get('image'))
    imageView.$().modal({})
`export default imageLinkView`