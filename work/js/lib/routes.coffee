#= require ./demo.coffee
Demo.Router = Backbone.Router.extend(
  routes:
    "": "index"
    "item/:item_id": "item"

  index: ->
    index = new Demo.Views.Index(
      collection: Demo.items
      back: false
    )
    index.show()

  item: (item_id) ->
    item = new Demo.Models.Item(Demo.items.models[item_id])
    item_view = new Demo.Views.Item(
      model: item
      back: true
    )
    item_view.show()
)