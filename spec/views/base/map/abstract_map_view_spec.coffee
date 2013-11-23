describe "Admin.Base.Views.AbstractMapView", ->
  beforeEach ->
    @subject = new TestEnv()
    runs ->
      model = @subject.store.find('user', 2).then (user) =>
        @subject.usersController.set('model', user)

    waitsFor ->
      @subject.usersController.get('model') != null

    runs ->
      @subject.view = Admin.Base.Views.AbstractMapView.create(context: @subject.usersController.get('model'), controller: @subject.usersController)
      @subject.view.set('mapType', 'asGoogleMap')

  it 'lanAttr', ->
    expect(@subject.view.get('lanAttr')).toEqual('lan')

  it 'lngAttr', ->
    expect(@subject.view.get('lngAttr')).toEqual('lng')

  it 'zoomAttr', ->
    expect(@subject.view.get('zoomAttr')).toEqual('zoom')

  it 'centerCoords', ->
    expect(@subject.view.centerCoords()).toEqual([ 50, 50])

  it ''