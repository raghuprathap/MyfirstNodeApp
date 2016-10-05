/*jslint white: true */
'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var csvtojson = require("./CSVtoJsonParser.js");
var runCsv = require('./util/RunCsv.js');
router.get("/", function(req, res, next){
	var jsonResponse = runCsv(function(){
		console.log("router");
	var readStream = fs.createReadStream("data.json",{"root": path.join(__dirname,'../')});
	res.setHeader('content-type', 'text/html');
	var filePath = path.join(__dirname, '../', 'data.json');
	var htmlFilePath = path.join(__dirname, '../views', 'index.html');
	/*fs.readFile(htmlFilePath, {encoding: 'utf-8'}, function(err,data){
		//console.log(data);
    //res.send(data);
    res.render(htmlFilePath);
	});*/
	res.render(htmlFilePath);
});


});

module.exports = router;