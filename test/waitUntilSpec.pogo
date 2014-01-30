waiter     = require '../lib/waitUntil'

describe 'wait until'
  describe 'timeout'
    it 'uses an internal default when none is provided'
      timeout = nil
      waiter.wait until!() @(options)
        timeout := options.timeout
        true

      timeout.should.equal(waiter.default options.timeout)

    it 'uses the timeout specified as an option'
      timeout = nil
      wait options = {
        timeout = 100
      }
      waiter.wait until!(options: wait options) @(options)
        timeout := options.timeout
        true

      timeout.should.equal(100)

    it 'uses the timeout specified on the scope'
      timeout = nil
      scope = {
        timeout = 500
      }
      waiter.wait until!(scope: scope) @(options)
        timeout := options.timeout
        true

      timeout.should.equal(500)

    it 'prefers an option timeout to a scope timeout'
      timeout = nil
      scope = {
        timeout = 100
      }
      options = {
        timeout = 600
      }
      waiter.wait until!(scope: scope, options: options) @(options)
        timeout := options.timeout
        true

      timeout.should.equal(600)