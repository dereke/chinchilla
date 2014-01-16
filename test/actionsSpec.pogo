actions = require '../lib/actions'
$       = require('./vendor/jquery')

attach(element) =
  test container = $('body #test-container')
  if ($('body #test-container').length == 0)
    test container := $('<div id="test-container"></div>')
    $('body').append(test container)

  test container.append(element)

describe 'actions'
  describe 'click!'
    it 'clicking a link fires event handlers' @(done)
      element = attach('<div><span class="click-me"></span></div>')

      event fired = false
      element.find('.click-me').on('click') @(e)
        event fired := true

      actions(element).click!('.click-me')
      event fired.should.be.true

      done()