chinchilla
==========

Control your browser via javascript using [capybara](https://github.com/jnicklas/capybara) like syntax.

# Purpose

This framework was created specifically to test `angular` apps written in [PogoScript](http://pogoscript.org). While it could be useful to test any web appliction it will be difficult to use if you are not using PogoScript. You should really try PogoScript it is a far nicer way to write JavaScript.

# How to use chinchilla

## Finders

```
browser.find!('.any-css-selector')
```

## Actions

```
browser.click!('.any-css-selector')
browser.select!('Orange', from: 'select[name=fruit]')
browser.fill in!('input.message', with value: 'Hello World')
```

## Query

```
browser.is visible!('.any-css-selector')
browser.has selector!('.any-css-selector')
```
