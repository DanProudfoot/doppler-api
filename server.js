var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose');
var serveStatic = require('serve-static');
 
mongoose.connect('mongodb://localhost/Doppler');
 
var albumModel = require('./models/album.js');
var songModel = require('./models/songs.js');
 

var app = express();

app.use(
	function crossOrigin(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use('/music/', serveStatic('/home/music/'));

var router = express.Router();


	
restify.serve(router, albumModel);
restify.serve(router, songModel, {
	middleware:modify
});

app.use(router);

function modify(req, res, next){
	console.log(res.body);
	next();
}

var port = 3610;
 
app.listen(port, function() {
    console.log("Express server listening on port " + port);
});