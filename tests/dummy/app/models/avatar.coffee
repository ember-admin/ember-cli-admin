`import Asset from 'ember-cli-admin/logics/asset'`
`import DS from 'ember-data'`

avatar = Asset.extend
  type:         DS.attr('string', {defaultValue: "Avatar"})

`export default avatar`
