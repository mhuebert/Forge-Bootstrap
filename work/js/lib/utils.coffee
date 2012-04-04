#= require ./demo.coffee
Demo.Utils = click_or_tap: (obj) ->
  new_obj = {}
  for property of obj
    if obj.hasOwnProperty(property)
      if forge?.is.mobile()
        new_obj["tap " + property] = obj[property]
      else
        new_obj["click " + property] = obj[property]
  new_obj