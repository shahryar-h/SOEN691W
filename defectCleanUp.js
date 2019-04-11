var fs = require('fs');

const opn = require('opn');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};


var defectFile = require("./filesWithPostReleaseDefects.txt");
var defectArray =  defectFile.split(',');
// console.log(defectArray);

// uniqueCount = ["a","b","c","d","d","e","a","b","c","f","g","h","h","h","e","a"];
var  count = {};
defectArray.forEach(function(i) { count[i] = (count[i]||0) + 1;});
console.log(Object.keys(count).length);
