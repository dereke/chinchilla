$       = require './vendor/jquery'

module.exports.attach(element) =
  test container = $('body #test-container')
  if ($('body #test-container').length == 0)
   test container := $('<div id="test-container"></div>')
   $('body').append(test container)

  test container.empty()
  test container.append(element)
