
var fs = require('fs');
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("out.csv");
const csv = require('csv-parse');
const opn = require('opn');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};


fs.createReadStream("./preRleaseDefects.csv")
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


var defectFile = csvP("./preRleaseDefects.csv");
 // defectFile = defectFile.toString;
// var defectArray =  defectFile.split(',');
console.log(defectFile);
