var fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline');
const opn = require('opn');

var filenames = [];
var filesOutCome = [];

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var changes = require("./test.txt").toString();
changes = changes.trim();
// changes  = changes.replace(/          [0-9].*/,"");
changes = changes.split(/\n/);

for (var i = 0; i < changes.length; i++) {
  changes[i] = changes[i].replace(/          [0-9].*/,"");
  changes[i] = changes[i].trim();
}

for (var i = 0; i < changes.length; i++) {
  changes[i] = changes[i].replace(/(\.\.)(.*)( )/g,"");
  //console.log(changes[i]);
}
for (var i = 0; i < changes.length; i++) {
  if (  /\.java/.test(changes[i])){
    var obj = /([^\/]+)(\.java)/.exec(changes[i]);
    var obj2 = /[0-9]+/.exec(changes[i]);
      if(obj !=null ){
        //console.log(obj[0]);
      var filename = obj[0];
      filenames.push(filename);
}
if(obj2 !=null ){
        //console.log(obj[0]);
      var timesChanged = obj2[0];
      filenames.push(timesChanged);
}
filesOutCome.push(filenames);

  }
}
filesOutCome = filesOutCome[0];
var result = '';
for (var i = 0; i < filesOutCome.length; i=i+2) {
  result = result + filesOutCome[i] + ',' + filesOutCome[i+1] + '\n';

}

fs.writeFile("changeMetrics.csv", result, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
// fs.writeFile("test2.txt", changes, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//
//     console.log("The file was saved!");
// });

//console.log(changes);
