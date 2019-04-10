var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
 // TODO: next is to do the scrapping
 // TODO: then i have to output it in an csv file
 // TODO: ultimatly need to find a mechanism to compare files in underdtand's
 // TODO:  dataset, and add the post rlease defect for file.
 // variable declearation:
   var defects = [];


// reading file and making an array out of each line
var words = require("./sampleCommit.txt");
var threeCommits = require("./log2.txt").toString();
var testi = "commit sdasjdklansd commit sdnbashkldhjals;";
var output = threeCommits.split(/commit([\s\S]+?)commit/)
output.splice(0, 1);
// console.log(output[3]);

for (var i = 0; i < output.length; i++) {

  var lines;
  var filenames = [];
  var defect = [];
  lines = output[i].split('\n');
  lines.shift();
  console.log(i);
  for(var j = 0;j < lines.length;j++){



    // thid removes the empty lines
    if (lines[j] == '') {
      lines.splice(i, 1);
    }

    // removes the space before defect id
    if (/^\s|\s$/.test(lines[j])) {
    lines[j]= lines[j].replace(/^\s+|\s+$/g,'')
    //console.log(lines[i]);
  }

    // this gets author's email address
    if (/Author/.test(lines[j])) {

        var obj= /<(.*)>/.exec(lines[j]);
          if(obj != null ){
        var author = obj[1].toString();
        defect.push(author);
      }
    }

    // this gives us the date of commit(defect)
    if (/date/gi.test(lines[j])) {
      obj = /(?<=date:   ).*$/gi.exec(lines[j]);
      if(obj !=null ){
        var date = obj[0];
        defect.push(date);
      }

      //console.log(date);
    }

    // this is the defect id, the one we use for screen scraping
    if (/\w*-\w*\./.test(lines[j])) {
      var obj = /\w*-\w*/.exec(lines[j]);
      if(obj !=null ){
      var commitId = obj[0];
      defect.push(commitId);
      // console.log(obj);
    }
    }

    if (  /([^\/]+)\.java$/.test(lines[j])) {
      var obj = /([^\/]+)\.java$/.exec(lines[j]);
      if(obj !=null ){
      var filename = obj[0];
      filenames.push(filename);
}
      //console.log(filename);
    }

  }

  defect.push(filenames);
  defects.push(defect);
}

console.log(defects);

    //console.log(output);
    //threeCommits = threeCommits.split(threeCommits|/commit([\s\S]*)commit/);
//
// var lines = words.split('\n');
//

// // this for loop makes a single commit in a for mat that we want and time it.
// for(var i = 0;i < lines.length;i++){
//   // thid removes the empty lines
//   if (lines[i] == '') {
//     lines.splice(i, 1);
//   }
//
//   //  this removes the comiits
//   if (/commit/.test(lines[i])) {
//     lines.splice(i, 1);
//   }
//
//   // removes the space before defect id
//   if (/^\s|\s$/.test(lines[i])) {
//   lines[i]= lines[i].replace(/^\s+|\s+$/g,'')
//   //console.log(lines[i]);
// }
//
//   // this gets author's email address
//   if (/Author/.test(lines[i])) {
//     var obj= /<(.*)>/.exec(lines[i]);
//     var author = obj[1].toString();
//     defect.push(author);
//
//   }
//
//   // this gives us the date of commit(defect)
//   if (/date/gi.test(lines[i])) {
//     obj = /(?<=date:   ).*$/gi.exec(lines[i]);
//     var date = obj[0];
//     defect.push(date);
//     //console.log(date);
//   }
//
//   // this is the defect id, the one we use for screen scraping
//   if (i == 2) {
//     var obj = /\w*-\w*/.exec(lines[i]);
//     var commitId = obj[0];
//     defect.push(commitId);
//     //console.log(commitId);
//   }
//
//   if (  /([^\/]+)\.java$/.test(lines[i])) {
//     var obj = /([^\/]+)\.java$/.exec(lines[i]);
//     var filename = obj[0];
//     filenames.push(filename);
//     //console.log(filename);
//   }
//
// }
// //

// //
//
//
//
//
//
//
// //
// //
// //
// //
// // words.replace(/^\s*$(?:\r\n?|\n)/gm, "")
// // console.log(lines);
