test "returns 2 navigations objects without params", ->
  navigation = Admin.DSL.Navigation.map ->
    @navigate "first menu link"
    @navigate "second menu link"
  equal(navigation.length, 2, "2 objects")
  equal(navigation[0].title, "first menu link")
  equal(navigation[1].title, "second menu link")

test "returns 2 object with params", ->
  navigation = Admin.DSL.Navigation.map ->
    @navigate "first menu link", translations: "first", route: "/1"
    @navigate "second menu link", translations: "second", route:"/2"

  equal(navigation.length, 2, "2 objects")

  equal(navigation[0].translations, "first", "Translations in params")
  equal(navigation[1].translations, "second", "Translations in params")

  equal(navigation[0].route, "/1", "route in params")
  equal(navigation[1].route, "/2", "route in params")

test "returns nested navigation objects", ->
  navigation = Admin.DSL.Navigation.map ->
    @navigate "first menu link", translations: "first", route: "/1", ->
      @navigate "sub first link"
      @navigate "sub second link"
    @navigate "second menu link", translations: "second", route:"/2"

  equal(navigation.length, 2, "2 objects")

  equal(navigation[0].children.length, 2, "2 nested objects")

test "returns nested navigation objects with params", ->
  navigation = Admin.DSL.Navigation.map ->
    @navigate "first menu link", translations: "first", route: "/1", ->
      @navigate "sub first link", translations: "sub 1 translation", route: "/1/1"
      @navigate "sub second link", translations: "sub 2 translation", route: "/1/2"
    @navigate "second menu link", translations: "second", route:"/2"

  equal(navigation[0].children[0].translations, "sub 1 translation", "Translations in params")
  equal(navigation[0].children[1].translations, "sub 2 translation", "Translations in params")

  equal(navigation[0].children[0].route, "/1/1", "route in params")
  equal(navigation[0].children[1].route, "/1/2", "route in params")


test "returns route when not defined", ->
  navigation = Admin.DSL.Navigation.map ->
    @navigate "first menu link", translations: "first"
  equal(navigation[0].route, "first_menu_link", "first_menu_link")
