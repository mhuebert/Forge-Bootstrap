window.Demo =
  Models: {}
  Collections: {}
  Views: {}
  Utils: {}
  init: ->
    showIndex = (data) ->
      Demo.items = new Demo.Collections.Items(data)
      Demo.router = new Demo.Router()
      Backbone.history.start()
    forge?.request.ajax
      url: "https://twitter.com/statuses/user_timeline/14972793.json"
      dataType: "json"
      success: showIndex