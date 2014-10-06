`import Attributes from 'emberadmin/dsl/attributes';`

baseDecorator = EmberEasyDecorator.extend

  unknownProperty: (propertyName) ->
    if /Value$/.test(propertyName)
      modelProperty = propertyName.substr(0, propertyName.length - 5)
      return @get('model.%@'.fmt(modelProperty))
    if /SectionFields$/.test(propertyName)
      return @_createSectionComputed(propertyName)
    if @get('model.%@'.fmt(propertyName))
      if @_checkMapProperty(propertyName) || @_checkFileupload(propertyName)
        return {options: {isVisible: false}}
      if Attributes.isBelongsTo(@get("model").constructor, propertyName)
        @set('%@Collection'.fmt(propertyName), @get('model.store').findAll(propertyName))
        return {html: {optionLabelPath: 'content.title'}, type: 'select', options: {relation: true}}
      else
        return @get('model.%@'.fmt(propertyName))
    return ""

  _checkMapProperty: (property) ->
    exist = @get("model.asGoogleMap") isnt `undefined` and @get("model.asGoogleMap").indexOf(property) >= 0
    return exist if exist
    @get("model.asYandexMap") isnt `undefined` and @get("model.asYandexMap").indexOf(property) >= 0

  _checkFileupload: (property) ->
    @get("model.fileuploads") isnt `undefined` and @get("model.fileuploads").indexOf(property) >= 0

`export default baseDecorator;`