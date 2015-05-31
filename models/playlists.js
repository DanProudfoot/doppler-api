var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var playlistSchema = new Schema({
    owner: id,
    name: String,
    contents: Array
});

module.exports = mongoose.model('Playlist', playlistSchema, 'Playlists');