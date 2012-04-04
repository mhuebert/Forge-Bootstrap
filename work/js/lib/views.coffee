#= require ./demo.coffee
Demo.Views.Page = Backbone.View.extend(
  className: "page"
  initialize: ->
    @render()

  show: ->
    $(".page").css position: "absolute"
    direction_coefficient = (if @options.back then 1 else -1)
    if $(".page").length
      $old = $(".page").not(@el)
      $old.get(0).style["margin-left"] = ""
      $old.get(0).style["-webkit-transform"] = ""
      @$el.appendTo("body").hide()
      @$el.show().css "margin-left": 320 * direction_coefficient
      @$el.anim
        translate3d: -320 * direction_coefficient + "px,0,0"
      , 0.3, "linear"
      $old.anim
        translate3d: -320 * direction_coefficient + "px,0,0"
      , 0.3, "linear", ->
        $old.remove()
        $(".page").css position: "static"
    else
      @$el.appendTo("body").hide()
      @$el.show()
    window.scrollTo 0, 0
)
Demo.Views.Index = Demo.Views.Page.extend(
  initialize: ->
    @render()

  render: ->
    that = this
    @collection.each (feed_item, index) ->
      if index % 2 is 1
        new_view = new Demo.Views.Feed(
          model: feed_item
          odd: true
        )
      else
        new_view = new Demo.Views.Feed(
          model: feed_item
          odd: false
        )
      $(that.el).append new_view.el

    this
)
Demo.Views.Feed = Backbone.View.extend(
  events: Demo.Utils.click_or_tap(
    ".feed-even": "expand_item"
    ".feed-odd": "expand_item"
  )
  expand_item: ->
    Demo.router.navigate "item/" + @model.cid.split("").slice(1), true

  initialize: ->
    @render()

  render: ->
    feed_class = (if @options.odd then "feed-odd" else "feed-even")
    $(@el).append "<div class=\"" + feed_class + "\">" + @model.get("text") + "</div>"
    this
)
Demo.Views.Item = Demo.Views.Page.extend(
  events: Demo.Utils.click_or_tap(
    "#back.feed-even": "go_back"
    "#item.feed-even": "expand_item"
    "#item.feed-odd": "expand_item"
  )
  expand_item: ->
    forge.tabs.open "https://twitter.com/triggercorp/status/" + @model.get("id_str")

  initialize: ->
    @render()

  go_back: ->
    Demo.router.navigate "", true

  render: ->
    author = @model.get("contributors")
    author_line = (if author then " by " + author else "")
    $(@el).append "<div id=\"back\", class=\"feed-even\">Back</div>"
    $(@el).append "<li id=\"item\", class=\"feed-odd\">" + @model.get("text") + "<div class=\"author\">" + author_line + "</div>" + "<div class=\"date\">" + @model.get("created_at").split(" ").slice(0, -2).join(" ") + "</div>" + "</li>"
    this
)