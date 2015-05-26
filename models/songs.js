var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var songSchema = new Schema({
    songTitle: String,
    songArtist: [String],
    albumArtist: [String],
    album: String,
    year: String,
    track: {no:Number, of:Number},
    genre: Array,
    duration: Number,
    path: String,
    artPath: String
});

module.exports = mongoose.model('Song', songSchema, 'Songs');