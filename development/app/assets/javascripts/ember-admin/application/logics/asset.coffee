Admin.Asset = DS.Model.extend
  original_filename: DS.attr('string')
  content_type: DS.attr('string', {defaultValue: ""})
  guid: DS.attr('string', {defaultValue: ""})
  assetable_id: DS.attr('string')
  assetable_type: DS.attr('string')
  thumb_url: DS.attr('string')
  url: DS.attr('string')
  type: DS.attr('string')