renderedView = undefined

describe 'using compiled templates', ->
  describe 'with ember', ->
    before (done) ->
      templates = grunt.file.read('tmp/emblem-ember.js')

      jsdom.env
        html: "<div id='test'></div>"
        src: [jQueryJs(), handlebarsJs(), emberJs(), templates]
        done: (errors, window) ->
          grunt.fail.warn(errors) if errors?
          $ = window.jQuery
          Ember = window.Ember

          Ember.Application.create()
          ExampleView = Ember.View.extend(templateName: "emblem-ember")
          exampleView = ExampleView.create(
            value: "a_value"
            context: Ember.Object.create(
              subcontext: Ember.Object.create(value: "subcontext_value")
              value: "context_value"
            )
          )

          Ember.run ->
            exampleView.appendTo "#test"

          renderedView = $("#test").text()
          done()

    it 'renders view values', ->
      renderedView.should.include "a_value"

    it "renders context values", ->
      renderedView.should.include "context_value"

    it "renders subcontexts values", ->
      renderedView.should.include "subcontext_value"

    it "renders partials", ->
      renderedView.should.include "partial_content"

  describe 'without ember', ->
    before (done) ->
      template = grunt.file.read('tmp/emblem-basic.js')
      jsdom.env
        html: "<div id='test'></div>"
        src: [jQueryJs(), handlebarsJs(), template]
        done: (errors, window) ->
          $ = window.jQuery

          grunt.fail.warn(errors) if errors?

          template = window.Handlebars.templates['emblem-basic']
          data =
            value: 'context_value'
            subcontext:
              value: 'subcontext_value'

          $("#test").append template(data)
          renderedView = $("#test").text()
          done()

    it "renders context values", ->
      renderedView.should.include "context_value"

    it "renders subcontexts values", ->
      renderedView.should.include "subcontext_value"


