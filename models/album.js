var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var albumSchema = new Schema({
    albumArtist: [String],
   	album: String,
   	year: String,
   	genre: Array,
   	artPath: String
});

module.exports = mongoose.model('Album', albumSchema, 'Albums');