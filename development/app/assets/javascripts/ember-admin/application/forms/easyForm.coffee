Ember.Handlebars.registerHelper "input-field", (property, options) ->
  options = Ember.EasyForm.processOptions(property, options)

  context = this

  options.hash.property = Ember.Handlebars.get(this, options.hash.propertyBinding, options)  if options.hash.propertyBinding
  options.hash.inputOptions = Ember.Handlebars.get(this, options.hash.inputOptionsBinding, options)  if options.hash.inputOptionsBinding

  property = options.hash.property

  propertyType = (property) ->
    try
      return (context.get("content") or context).constructor.metaForProperty(property).type
    catch e
      return null

  options.hash.valueBinding = property
  options.hash.viewName = "input-field-" + options.data.view.elementId
  if options.hash.inputOptions
    inputOptions = options.hash.inputOptions
    optionName = undefined
    for optionName of inputOptions
      options.hash[optionName] = inputOptions[optionName]  if inputOptions.hasOwnProperty(optionName)
    delete options.hash.inputOptions

  if options.hash.inputConfig
    configs = options.hash.inputConfig.split(";")
    i = configs.length
    while i--
      config = configs[i].split(":")
      options.hash[config[0]] = config[1]


  if options.hash.as is "text"
    Ember.Handlebars.helpers.view.call context, Ember.EasyForm.TextArea, options
  else if options.hash.as is "select"
    delete (options.hash.valueBinding)
    type = context.get("model").constructor
    if Admin.DSL.Attributes.relations(type).indexOf(property) >= 0
      options.hash.attribute = property
      options.hash.content = context.store.findAll(property)
      options.hash.selection = context.get(property)
      options.hash.optionValuePath = "context.id"
      options.hash.optionLabelPath = "context.title"
      options.hash.prompt = "Place select %@".fmt(property)
    else
      options.hash.contentBinding = options.hash.collection
      options.hash.selectionBinding = options.hash.selection
      options.hash.valueBinding = options.hash.value
    Ember.Handlebars.helpers.view.call context, Ember.EasyForm.Select, options
  else
    unless options.hash.as
      if property.match(/password/)
        options.hash.type = "password"
      else if property.match(/email/)
        options.hash.type = "email"
      else if property.match(/url/)
        options.hash.type = "url"
      else if property.match(/color/)
        options.hash.type = "color"
      else if property.match(/^tel/)
        options.hash.type = "tel"
      else if property.match(/search/)
        options.hash.type = "search"
      else
        if propertyType(property) is "number" or typeof (context.get(property)) is "number"
          options.hash.type = "number"
        else if propertyType(property) is "date" or (not Ember.isNone(context.get(property)) and context.get(property).constructor is Date)
          options.hash.type = "date"
        else if propertyType(property) is "boolean" or (not Ember.isNone(context.get(property)) and context.get(property).constructor is Boolean)
          options.hash.checkedBinding = property
          return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.Checkbox, options)
    else
      inputType = Ember.EasyForm.Config.getInputType(options.hash.as)
      if inputType
        options.hash.property = property
        return Ember.Handlebars.helpers.view.call(context, inputType, options)
      options.hash.type = options.hash.as
    return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextField, options)


Ember.Handlebars.registerHelper "input", (property, options) ->
  options = Ember.EasyForm.processOptions(property, options)
  return  if options.contexts[0].get("fileuploads") isnt `undefined` and options.contexts[0].get("fileuploads").getEach("name").indexOf(property) >= 0
  type = options.contexts[0].get("model").constructor
  options.hash.as = "select"  if Admin.DSL.Attributes.relations(type).indexOf(property) >= 0
  options.hash.property = property
  options.hash.isBlock = !!(options.fn)
  Ember.Handlebars.helpers.view.call this, Ember.EasyForm.Input, options

Ember.Handlebars.registerBoundHelper "bound-input", (property, options) ->
  options = Ember.EasyForm.processOptions(property, options)
  return  if options.contexts[0].get("fileuploads") isnt `undefined` and options.contexts[0].get("fileuploads").getEach("name").indexOf(property) >= 0
  type = options.contexts[0].get("model").constructor
  options.hash.as = "select"  if Admin.DSL.Attributes.relations(type).indexOf(property) >= 0
  options.hash.property = property
  options.hash.isBlock = !!(options.fn)
  Ember.Handlebars.helpers.view.call this, Ember.EasyForm.Input, options

Ember.EasyForm.Select = Ember.Select.extend
  attributeBindings: ["attribute"]
  change: ->
    path = "context.%@".fmt(@get("attribute"))
    @set path, @get("selection")

Ember.EasyForm.Form.reopen
  submit: (event) ->
    _this = this
    promise = undefined
    event.preventDefault()
    return @get("controller").send @action if @get("context.isValid")
    if Ember.isNone(@get("context.isValid"))
      @get("controller").send @action
    else
      unless Ember.isNone(@get("context").validate)
        promise = @get("context").validate()
      else
        promise = @get("context.content").validate()
      promise.then ->
        _this.get("controller").send _this.action  if _this.get("context.isValid")