var glob=require("glob")
var path=require("path")
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        console.log(basename)
        pathname = path.join(dirname.replace(__dirname,""), basename);
        entries[pathname] = entry;
    }
    return entries;
}
console.log(getEntry(__dirname+"/src/js/**/*.js"))
console.log(path.join('./src/js/hello',"hello"))