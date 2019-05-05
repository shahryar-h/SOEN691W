var fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline');
const opn = require('opn');

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
  //console.log(i);
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

// console.log(defects);

var allFiles = [];
// var samp = defects[0];
// console.log(samp);
for (var i = 0; i < defects.length; i++) {
  //allFiles.push(defects[i][defects[i].length-1]);
  for (var j = 0; j < defects[i][defects[i].length-1].length; j++) {
    allFiles.push(defects[i][defects[i].length-1][j]);
    allFiles.push(defects[i][0]);
  }
}

// console.log(allFiles);


var result = [];
var count = 1;
for (var i = 0; i < allFiles.length; i=i+2) {
  for (var j = i+2; j < allFiles.length; j+=2) {
    if (allFiles[j] == allFiles[i]) {
      // cheaking the emails
      if (allFiles[j+1] != allFiles[i+1]) {

        count++;


      }
      allFiles.splice(j,2);
    }
  }
  result.push(allFiles[i])
  result.push(count);
  count = 1;
}

// console.log(result);

var output = '';
for (var i = 0; i < result.length; i+=2) {
  output = output + result[i] + ',' + result[i+1] + '\n';

}


fs.writeFile("Authors.csv", output, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});



