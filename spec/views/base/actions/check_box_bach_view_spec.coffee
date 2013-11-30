describe 'Admin.Base.Views.CheckboxBatchView', ->
  beforeEach ->
    @subject = new TestEnv()
    @controller = @subject.usersController
    model = Ember.Object.create({items: [{name: 1}, {name: 2}]})
    @controller.set('model', model)
    @controller.set('__batches', [])
    @mainView  = Admin.Base.Views.CheckboxBatchView.create(selectAll: true, controller: @controller, context: @controller)

  it 'select all items in table', ->
    @mainView.set('checked', true)
    expect(@controller.get('__batches.length')).toEqual(2)

  it 'observes checked in view', ->
    view = Admin.Base.Views.CheckboxBatchView.create(controller: @controller, context: @controller.get('model.items.firstObject'))
    @mainView.set('checked', true)
    expect(view.get('checked')).toBeTruthy()

  it 'unchecked elements in table', ->
    @mainView.set('checked', true)
    @mainView.set('checked', false)
    expect(@controller.get('__batches.length')).toEqual(0)

  it '', ->