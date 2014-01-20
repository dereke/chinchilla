create element(html:  '<div></div>')=
  appContainer = $('div#angularApp')
  if (appContainer.length == 0)
    appContainer := $('<div id="angularApp"></div>').appendTo($(document.body))

  appContainer.empty().nextAll().remove()

  $(html).appendTo(appContainer)

module.exports.bootstrap angular(application name, html: nil, configure : nil, run : nil, angular dependencies : [])=
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
    injector = angular.bootstrap(root element.0, [test module name])
    injector.invoke(run)
  else
    console.log('You probably meant to supply a run block')
