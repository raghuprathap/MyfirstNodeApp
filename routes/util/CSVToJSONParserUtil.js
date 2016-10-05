
function CSVtoJsonParser(fileData, callback){
  'use strict';
  var fs = require("fs");
  var stats = fs.statSync(fileData.fileName);
  var readline=require('readline');

  var headers = [];
  var requiredHeaders = [];
  var i = 0;

  var writeStream=fs.createWriteStream(fileData.jsonFileName);
  //writeStream.write('[');
  if(stats.isDirectory()){
    fs.readdir("./" + fileData.fileName, function(err, items) {
      for (a=0; a<items.length; a++) {
        input = fs.createReadStream("./csvfiles/" + items[i]);
        csvJSON(input);
      }
    });
  } else {
    var input = fs.createReadStream(fileData.fileName);

    csvJSON(input);

  }

  function csvJSON(csvContents){
    var jsonArray = [];
    var lineReader=readline.createInterface({
      input : csvContents
    });
    lineReader.on('line', function(line){
      console.log("hello");
      if(i === 0){

        headers = line.split(",");
        i= i+1;
      } else {
        var obj = {};
        var currentLineData = line.split(",");
        for(var k = 0; k < headers.length; k++){

          if(fileData.hasOwnProperty('requiredHeaders')){
            requiredHeaders = fileData.requiredHeaders;
            for(var j = 0; j < requiredHeaders.length; j++) {

              if(headers[k].replace(/\"/g, "") === requiredHeaders[j]){

                obj[headers[k].replace(/\\"/g, '"')] = currentLineData[k].replace(/\\"/g, '"');
              }
            }
          }
          else{
            obj[headers[k].replace(/\\"/g, '"')] = currentLineData[k].replace(/\\"/g, '"');
          }

        }
        //console.log(obj);
        jsonArray.push(obj);
        //console.log(jsonArray.length);


      }
      //console.log(jsonArray.length);
      //console.log(JSON.stringify(jsonArray));

    });
    console.log("hello end");
    console.log(jsonArray.length);
    lineReader.on('close', function(){
      //console.log(jsonArray);
      writeStream.write(JSON.stringify(jsonArray).replace(/\\"/g, ''),"utf8");
      callback();
    });
  }

}
module.exports.CSVtoJsonParser = CSVtoJsonParser;
