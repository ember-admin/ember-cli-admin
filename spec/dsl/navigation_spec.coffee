describe 'Admin.DSL.Navigation', ->
  beforeEach ->
    Admin.DSL.Navigation.map ->
      @navigate "Dashboard", route: "", divider: true
      @navigate "System", ->
        @navigate "Users"
        @navigate "Addresses", ->
          @navigate "Work"
          @navigate "Home"
        @navigate "Cars", divider: true

  it 'check nested', ->
    expect(Admin.DSL.Navigation.content.length).toEqual(2)
    expect(Admin.DSL.Navigation.content[1].children.length).toEqual(3)
    expect(Admin.DSL.Navigation.content[1].children[1].children.length).toEqual(2)

  it 'check params', ->
    item = Admin.DSL.Navigation.content[0]
    expect(item.id).toBeDefined()
    expect(item.title).toEqual('Dashboard')
    expect(item.route).toEqual('')
    expect(item.divider).toBeTruthy()

  it 'check namespace', ->
    Admin.DSL.Navigation.namespace = "admin"
    expect(Admin.DSL.Navigation.namespace).toEqual('admin')

  it 'hasParent', ->
    item = Admin.DSL.Navigation.content[1]
    child = Admin.DSL.Navigation.content[1].children[0]
    expect(child.parentId).toEqual(item.id)

  it 'findParent', ->
    child = Admin.DSL.Navigation.content[1].children[0]
    expect(Admin.DSL.Navigation.findParent(child)).toEqual(Admin.DSL.Navigation.content[1])