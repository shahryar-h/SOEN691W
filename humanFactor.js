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


var allFiles = [];
var samp = defects[0];

for (var i = 0; i < samp[samp.length-1].length; i++) {
  allFiles.push(samp[samp.length-1][i]);
  allFiles.push(samp[0]);
}
// var count = 1;
// for (var i = 0; i < allfiles.length; i=i+2) {
//   allfiles[i]
//   for (var j = 0; j < allFiles.length; j=j+2) {
//     if (allfiles[i] == allfiles[j]) {
//       count++;
//     }
//   }
// }

// console.log(allFiles);

var result = "";
var count = 1;
for (var i = 0; i < allFiles.length; i=i+2) {
  // for (var j in allFiles ) {
  //   if (allFiles[j+2] == (allFiles[i])) {
  //     console.log("I say " + allFiles[j+2] + "is equal to: " + allFiles[i]);
  //     count++;
  //   }
  // }



  for (var j = i+2; j < allFiles.length; j+=2) {
    if (allFiles[j] == allFiles[i]) {
      console.log("I say " + allFiles[j] + "is equal to: " + allFiles[i]);
      // cheaking the emails
      if (allFiles[j+1] != allFiles[i+1]) {
        count++;
      }

    }
  }
}
console.log(count);

// console.log(defects);
// var urlAndAssociatedFiles = [];
//
//
// for (var i = 0; i < defects.length; i++) {
//
//   var defectIdarry = defects[i];
//   var defectId = defectIdarry[2];
//   var associateFiles = defectIdarry[3];
//   if (  typeof defectId === 'string' && associateFiles.length != 0) {
//
//     var defectUrl = 'https://issues.apache.org/jira/si/jira.issueviews:issue-xml/' + defectId + '/' + defectId +'.xml';
//     var temp = [];
//     temp.push(defectUrl);
//     temp.push(associateFiles);
//     urlAndAssociatedFiles.push(temp);
//
//
//   }
// }
// var filesWithBug =[];
// processArray(urlAndAssociatedFiles);
// // console.log(urlAndAssociatedFiles.length);
// //
//
//
//
// function delay() {
//   return new Promise(resolve => setTimeout(resolve, 100));
// }
//
// async function delayedLog(item,end) {
//   // notice that we can await a function
//   // that returns a promise
//   await delay();
//
//   // console.log(item);
//
//
//   request(item[0], (error, response, html) => {
//     if(!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       $tit = $('title').text();
//       $title = $('type').text();
//       if ($title == 'Bug' ) {
//         $resolution = $('resolution').text();
//         if ($resolution == 'Fixed') {
//           $resolved = $('resolved').text();
//           var mydate = new Date($resolved);
//           var anotherDate = new Date('Tue Apr 21 2015');
//           if (mydate > anotherDate) {
//             //console.log(item[1]);
//             filesWithBug.push(item[1]);
//           }else {
//         console.log(" has date error");
//       }
//         }else {
//         console.log(" is not Fixed");
//       }
//       }else {
//         console.log(" is not a Bug");
//       }
//
//   }});
//   if (end === 0) {
//     console.log("files: " + filesWithBug.length);
//     fs.writeFile("filesWithPostReleaseDefects.txt", filesWithBug, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//
//     console.log("The file was saved!");
// });
//   }
//
//
// }
// async function processArray(array) {
//
//   for (var l = 0; l < array.length; l++) {
//
//     if (l < array.length-1 ) {
//       await delayedLog(array[l]);
//     }else {
//       await delayedLog(array[l],0);
//     }
//
//   }
//
//
// }



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
