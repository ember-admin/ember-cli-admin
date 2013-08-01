test "returns user defined attributes and id", ->
  Admin.User = DS.Model.extend
    email: DS.attr('string')

  attributes = Admin.DSL.Attributes.detect(Admin.User)
  equal(attributes.length, 2)

test "returns with user defined property", ->
  Admin.User = DS.Model.extend
    email: DS.attr('string')

    emails: (->
      [@get('email')]
    ).property('email')
  attributes = Admin.DSL.Attributes.detect(Admin.User)
  equal(attributes.length, 2)

test "singularize", ->
  equal(Admin.DSL.Attributes.singularize("users"), "user")

test "pluralize", ->
  equal(Admin.DSL.Attributes.pluralize("user"), "users")
