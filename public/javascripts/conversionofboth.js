var fs = require("fs");
var flag=0;
var headers=[];
var obj = {};
var start=2001;
var end=2016;
var arr1=[];
var arr2=[];
var jsonConverter = function(start,end,csv,output1,output2) {
 for(var k=start;k<=end;k++){
   arr1[k-start]={
     year:k,
     above:0,
     below_and_under:0
   };
   arr2[k-start]={
     year:k,
     Arrested:0,
     NotArrested:0
   };
 }
 var inStream=fs.createReadStream(csv);
 var wstream1 = fs.createWriteStream(output1+'.JSON');
 var wstream2 = fs.createWriteStream(output2+'.JSON');
 var lineRead=require("readline").createInterface({
   input:inStream
 });
 lineRead.on("line", function (line) {
    var data = line.toString();
    if(flag==0){
      headers = data.split(",");
      flag=1;
    }
    else{
      var cline=data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
     for (var i = 0; i < cline.length; i++) {
         obj[headers[i]] = cline[i];
       }
       for(var j=start;j<=end;j++){
         if(obj["Year"]==arr1[j-start].year){
             if (obj["Description"]=="OVER $500") {
               arr1[j-start].above=arr1[j-start].above+1;
             }
             else if (obj["Description"]=="$500 AND UNDER") {
               arr1[j-start].below_and_under=arr1[j-start].below_and_under+1;
}

if (obj["Arrest"]=="true") {
  arr2[j-start].Arrested=arr2[j-start].Arrested+1;
}
else{
  arr2[j-start].NotArrested=arr2[j-start].NotArrested+1;
}
             }
           }
     }
 });
 inStream.on("end", function(){
     wstream1.write(JSON.stringify(arr1));
   wstream2.write(JSON.stringify(arr2));
 });
};
jsonConverter(start,end,"crimes2001onwards.csv","result_stackedbarchart","result_multiserieslinechart");
