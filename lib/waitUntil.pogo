_ = require 'underscore'

exports.default options = {
  timeout             = 1000
  wait between checks = 20
}

exports.wait until!(condition satisfied, scope: nil, options: nil) =
  continue with execution = continuation
  actual options = _.clone(exports.default options)

  if (scope)
    _.extend(actual options, _.pick(scope, 'timeout', 'waitBetweenChecks'))

  if (options)
    _.extend(actual options, _.pick(options, 'timeout', 'waitBetweenChecks'))

  options := actual options

  max number of runs = Math.round(options.timeout/options.wait between checks)
  number of runs = 0

  wait()=
    if (number of runs == max number of runs)
      continue with execution()

    satisfied = condition satisfied!(options)

    if (satisfied)
      continue with execution()
    else
      number of runs := number of runs + 1
      set timeout (wait, options.wait between checks)

  wait()

