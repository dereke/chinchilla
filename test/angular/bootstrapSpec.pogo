require '../vendor/angular'
bootstrap = require('../../lib/angular/bootstrap').bootstrap angular

chai.expect()

describe 'angular bootstrap'
  it 'adds the root element to the page' @(done)
    my app = angular.module('MyApp', [])

    verify root element on page($rootElement)=
      $('#angularApp div').0.should.equal($rootElement.0)
      done()

    bootstrap('MyApp', run: verify root element on page)

  it 'adds a customised root element to the page' @(done)
    my app = angular.module('MyApp', [])

    html = '<span class="custom-html"></span>'

    verify root element on page($rootElement)=
      $('#angularApp span.custom-html').0.should.equal($rootElement.0)
      done()

    bootstrap('MyApp', html: html, run: verify root element on page)

  describe 'configure'
    it 'executes the supplied configuration block' @(done)
      my app = angular.module('MyApp', [])

      actual application object = nil

      verify configuration(application, root element)=
        application.should.not.be.null
        done()

      bootstrap('MyApp', configure: verify configuration)

  describe 'run'
    it 'executes the supplied run block in the context of the application' @(done)
      my factory() =
        'noop'

      my app = angular.module('MyApp', [])
      my app.factory('MyFactory', my factory)

      verify factory injected(MyFactory)=
        MyFactory.should.equal(my factory())
        done()

      bootstrap('MyApp', run: verify factory injected)

  describe 'test setup'
    it 'runs before the application runs' @(done)
      my app = angular.module('MyApp', [])

      test setup has run = nil

      test setup ran()=
        test setup has run := true

      verify run()=
        test setup has run.should.be.true
        done()

      bootstrap('MyApp', test setup: test setup ran, run: verify run)

    it 'has dependencies injected' @(done)
      my factory() =
        'noop'

      my app = angular.module('MyApp', [])
      my app.factory('MyFactory', my factory)

      test setup has run = nil

      verify test setup(MyFactory)=
        MyFactory.should.equal(my factory())
        done()

      noop()=
        'noop'

      bootstrap('MyApp', test setup: verify test setup, run: noop)
