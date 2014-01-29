exports.wait until!(condition satisfied, scope: nil, timeout: nil, wait between checks: 20) =
  if (!timeout && scope)
    timeout := scope.timeout

  if (!timeout)
    timeout := 1000

  max number of runs = Math.round(timeout/wait between checks)
  number of runs = 0

  wait()=
    if (number of runs == max number of runs)
      continuation()

    if (!condition satisfied())
      number of runs := number of runs + 1
      set timeout (wait, wait between checks)
    else
      continuation()

  wait()
