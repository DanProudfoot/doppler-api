// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Album = require('./models/album.js');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/Doppler'); // connect to our database
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8074;        // set our port

var router = express.Router();

// Middleware time!

router.use(function(req, res, next){
	console.log('Something is happening');
	next(); //Makes sure we continue to further routes
})

// Middleware over

router.get('/', function(req, res){
	res.json({message:"API is go!"});
});



router.route('/albums')

	.post(function(req, res){
		var album = new Album();
		album.album = req.body.album;

		album.save(function(err){
			if (err) res.send(err);
			res.json({message: 'Album created'});
		});
	})

	.get(function(req, res){
		Album.find(function(err, albums){
			if (err) res.send(err);
			res.json(albums);
		});
	});

router.route('/albums/:album_id')

	.get(function(req, res){
		Album.findById(req.params.album_id, function(err, album){
			if (err) res.send(err);
			res.json(album);
		});
	})

	.put(function(req, res){
		Album.findById(req.params.album_id, function(err, album){
			if (err) res.send(err);
			album.album = req.body.album;

			album.save(function(err){
				if (err) res.send(err);
				res.json({ message: 'Album updated'});
			});
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Find me on port ' + port);