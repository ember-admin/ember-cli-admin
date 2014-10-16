`import Ember from 'ember'`

imageLinkView = Ember.View.extend
  tagName: "a"

  attributeBindings: ["href"]

  href: "#"

  templateName: "admin/fileuploads/link-to-image"

  click: (e) ->
    e.preventDefault()
    imageUrl = this.get('image.url')
    console.log(this.get('controller'))
#    throw 'implement me'
    this.get('controller').send('openImagePreview', Ember.Object.create({
      model: this.get('model')
    }));
#    imageView = Ember.View.views['FileUploadModal']
#    imageView.set('image', @get('image'))
#    imageView.$().modal({})
`export default imageLinkView`