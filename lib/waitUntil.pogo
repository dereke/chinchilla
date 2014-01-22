exports.wait until!(check condition) =
  wait()=
    if (check condition())
      set timeout (wait, 20)
    else
      continuation()

  wait()
