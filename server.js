var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose')
 
mongoose.connect('mongodb://localhost/Doppler');
 
var albumModel = require('./models/album.js');
var songModel = require('./models/songs.js');
 

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
 
var router = express.Router();
restify.serve(router, albumModel);
restify.serve(router, songModel);
app.use(router);

var port = 3610;
 
app.listen(port, function() {
    console.log("Express server listening on port " + port);
});