exports.wait until!(condition satisfied, timeout: 1000, wait between checks: 20) =
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
