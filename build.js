var fs = require("fs");
var browserify = require("browserify");
browserify("./src/index.js")
  .transform("babelify", {presets: ["@babel/preset-env"], plugins:['transform-class-properties']})
  .bundle()
  .pipe(fs.createWriteStream("dist/bundle.js"));