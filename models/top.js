var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var topSchema = new Schema({
    message: String,
    songs: Array
});

module.exports = mongoose.model('TopContent', topSchema, 'TopContent');