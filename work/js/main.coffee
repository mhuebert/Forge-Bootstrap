#= require vendor/zepto.min.js
#= require vendor/underscore.js
#= require vendor/backbone.js
#= require vendor/handlebars-runtime-1b6.js
#= require templates.js
#= require_tree lib/

if !$ then $ = Zepto
window.forge?.debug = true;
$ ->
  forge?.logging.log "Logger, checking in."
  
  setTimeout ->
    $("body").append $("<p>Oh yes we can.</p>").css(opacity:0).animate({opacity:1})
  , 1500
  
  setTimeout ->
    $("body").append $(templates.welcome({message:"With a precompiled Handlebars template, no less."})).css(opacity:0).animate({opacity:1})
  , 3000
  
  setTimeout ->
    $("body").append $(templates.welcome({message:"(stylus-enhanced)"})).css(opacity:0).animate({opacity:1}).addClass("styled")
  , 4500
  
  setTimeout ->
    $("body").html("<div id='content'></div>")
    $(Demo.init)
  , 6500