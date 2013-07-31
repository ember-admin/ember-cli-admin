test "returns 2 navigations objects without params", ->
  navigation = NavigationDsl.map ->
    @navigate "first menu link"
    @navigate "second menu link"
  equal(Object.keys(navigation).length, 2, "2 objects")


test "returns 2 object with params", ->
  navigation = NavigationDsl.map ->
    @navigate "first menu link", translations: "first", route: "/1"
    @navigate "second menu link", translations: "second", route:"/2"

  equal(Object.keys(navigation).length, 2, "2 objects")

  equal(navigation["first menu link"].translations, "first", "Translations in params")
  equal(navigation["second menu link"].translations, "second", "Translations in params")

  equal(navigation["first menu link"].route, "/1", "route in params")
  equal(navigation["second menu link"].route, "/2", "route in params")

test "returns nested navigation objects", ->
  navigation = NavigationDsl.map ->
    @navigate "first menu link", translations: "first", route: "/1", ->
      @navigate "sub first link"
      @navigate "sub second link"
    @navigate "second menu link", translations: "second", route:"/2"

  equal(Object.keys(navigation).length, 2, "2 objects")

  equal(Object.keys(navigation["first menu link"].children).length, 2, "2 nested objects")

test "returns nested navigation objects with params", ->
  navigation = NavigationDsl.map ->
    @navigate "first menu link", translations: "first", route: "/1", ->
      @navigate "sub first link", translations: "sub 1 translation", route: "/1/1"
      @navigate "sub second link", translations: "sub 2 translation", route: "/1/2"
    @navigate "second menu link", translations: "second", route:"/2"

  equal(navigation["first menu link"].children["sub first link"].translations, "sub 1 translation", "Translations in params")
  equal(navigation["first menu link"].children["sub second link"].translations, "sub 2 translation", "Translations in params")

  equal(navigation["first menu link"].children["sub first link"].route, "/1/1", "route in params")
  equal(navigation["first menu link"].children["sub second link"].route, "/1/2", "route in params")