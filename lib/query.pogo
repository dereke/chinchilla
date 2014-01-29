module.exports(scope) =
  {
    is visible!(locator) =
      scope.find!(locator).is(':visible')

    has selector!(locator, count: nil)=
      number of elements = scope.find!(locator).length
      if (count)
        number of elements == count
      else
        number of elements > 0
  }
