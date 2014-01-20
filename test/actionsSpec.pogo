actions = require '../lib/actions'
$       = require('./vendor/jquery')

describe 'actions'
  describe 'click!'
    it 'clicking a link fires event handlers' @(done)
      element = $('<div><span class="click-me"></span></div>')

      event fired = false
      element.find('.click-me').on('click') @(e)
        event fired := true

      actions(element).click!('.click-me')
      event fired.should.be.true

      done()

    it 'click the first element' @(done)
      element = $('<div><span class="click-me">first</span><span class="click-me">second</span></div>')

      fired events = []
      element.find('.click-me').on('click') @(e)
        fired events.push(e)

      actions(element).click!('.click-me', first: true)
      fired events.length.should.equal(1)
      element text = fired events.0.target.innerHTML
      element text.should.equal('first')


      done()

  describe 'select!'
    it 'selects an item in a select box with the given text' @(done)
      element = $("<div>
                    <select>
                      <option value='1'>Apple</option>
                      <option value='2'>Orange</option>
                      <option value='3'>Kiwi</option>
                    </select>
                   </div>")

      event fired = false
      selected index = nil
      element.find('select').on('change') @(e)
        event fired := true
        selected index := e.target.selectedIndex

      actions(element).select!('Orange', from: 'select')
      event fired.should.be.true
      selected index.should.equal(1)

      done()

  describe 'fill in!'
    it 'clicking a link fires event handlers' @(done)
      element = $('<div><input name="model"></div>')

      event fired = false
      element.find('input').on('change') @(e)
        event fired := true

      actions(element).fill in!('input[name=model]', with value: 'Ford Focus')
      event fired.should.be.true
      element.find('input').val().should.equal('Ford Focus')

      done()
