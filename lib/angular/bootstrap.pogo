create element(html:  '<div></div>')=
  appContainer = $('div#angularApp')
  if (appContainer.length == 0)
    appContainer := $('<div id="angularApp"></div>').appendTo($(document.body))

  appContainer.empty().nextAll().remove()

  $(html).appendTo(appContainer)

module.exports.bootstrap angular(application name, html: nil, configure : nil, test setup : nil, run : nil, angular dependencies : [])=
  test module name = "Test#(application name)"
  root element = create element(html: html)


  angular dependencies.push(application name)
  console.log "Booting application #(angular dependencies.join(','))"
  application = angular.module(test module name, angular dependencies)

  // this is because of what I think is a bug in pogo where the continuation gets add as a dependency
  application.factory 'continuation'
    nil

  if (configure)
    configure(application, root element)
  else
    console.log('You may want to supply a configuration block')

  if (run)
    element = angular.element(root element.0)

    modules = [test module name]
    modules.unshift(['$provide', @($provide)
      $provide.value('$rootElement', element)
      nil
    ])
    modules.unshift('ng')

    injector = angular.injector(modules)
    if (test setup)
      injector.invoke(test setup)

    injector.invoke() @($rootScope, $rootElement, $compile, $animate)
        $rootScope.$apply()
          element.data('$injector', injector)
          ($compile($rootElement))($rootScope)

    injector.invoke(run)
  else
    console.log('You probably meant to supply a run block')
