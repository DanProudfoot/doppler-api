var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Doppler');

var server = restify.createServer({
	name: 'doppler.api',
	version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var albumModel = require('./models/album.js');
var songModel = require('./models/songs.js');

var albums = restifyMongoose(albumModel);
var songs = restifyMongoose(songModel);

server.get(/\/music\/?.*/, restify.serveStatic({
	directory: '/home/music/'
}));

server.get('/albums',albums.query());
server.get('/albums/:id',albums.detail());
server.get('/songs',songs.query());
server.get('/songs/:id',songs.detail());

server.listen(3611, function () {
    console.log('%s listening at %s', server.name, server.url);
});