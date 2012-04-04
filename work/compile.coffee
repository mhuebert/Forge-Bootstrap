Snockets = require 'snockets'
snockets = new Snockets()
fs = require 'fs'
path = require 'path'
stylus = require 'stylus'
jade = require 'jade'
Handlebars = require 'handlebars'

convert_ext = (filename, new_ext) ->
  filename[0..filename.length - path.extname(filename).length]+new_ext
source_dirname = path.resolve(__dirname+"/../src")

console.log "Handlebars templates:"
template_dir = path.resolve(__dirname, "templates")
code = "var compiled_templates = {};var templates = {};\n"
for filename in fs.readdirSync template_dir
  if filename[-4..] == "jade"
    console.log "...#{filename}"
    name = filename[..-6]
    # exports[name] = 
    filepath = path.join(template_dir, filename)

    html = jade.compile(fs.readFileSync(filepath, 'utf8'))({})
    
    code += "compiled_templates.#{name} = #{Handlebars.precompile(html)};\n"
    code += "templates['#{name}'] = Handlebars.template(compiled_templates['#{name}']);"
    if name[-7..] == "partial"
      "Handlebars.registerPartial('#{name}', templates['#{name}'])"
    # templates[name] = eval(compiled_template)

write_path = path.resolve(__dirname, "js/templates.js")
fd = fs.openSync(write_path, 'w')
fs.writeSync fd, code


console.log "Main.coffee"
read_path = '/js/main.coffee'
str = snockets.getConcatenation __dirname+read_path, {minify: false, async: false}

write_path = convert_ext path.resolve(source_dirname+read_path), "js"
fd = fs.openSync(write_path, 'w') 
fs.writeSync fd, str


console.log "Styles"
styles_dir = path.resolve(__dirname, "css")
for filename in fs.readdirSync styles_dir
  console.log filename
  str = ""
  styles = fs.readFileSync path.resolve(styles_dir, filename), "utf-8"
  stylus.render styles, (err, str) -> 
    write_path = convert_ext path.resolve(source_dirname, "css", filename), "css"
    fd = fs.openSync(write_path, 'w') 
    fs.writeSync fd, str


console.log "Jade views:"
jade_dir = path.resolve(__dirname, "views")
for filename in fs.readdirSync jade_dir
  console.log "...#{filename}"
  html = jade.compile(fs.readFileSync(path.resolve(jade_dir, filename), 'utf8'))({})
  write_path = convert_ext path.resolve(source_dirname, "views", filename), "html"
  if filename == "index.jade" then write_path = convert_ext path.resolve(source_dirname, filename), "html"
  fd = fs.openSync(write_path, 'w')
  fs.writeSync fd, html
  


