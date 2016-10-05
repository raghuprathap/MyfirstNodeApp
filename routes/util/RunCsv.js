/*jslint white: true */
function RunCsv(callback){
	'use strict';

	var csvtojson = require("./CSVToJSONParserUtil.js");
csvtojson.CSVtoJsonParser({fileName: "datafile.csv",
                                        requiredHeaders:["Country Name", "Area (Sq. Km.) 2010"],
    //filterCriteria: [{header:"Population (Millions) 2010", data: "100", filterOperator: ">"}],
    jsonFileName: "data.json"},callback);

}
module.exports = RunCsv;

//filterCriteria:{"Population (Millions) 2010": ">100"},