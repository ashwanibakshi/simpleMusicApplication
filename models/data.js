var mongoose = require('mongoose');

var audioSchema = new mongoose.Schema({
    name:{
        type:String
    },
    audio:{
        type:String
    }
});

module.exports = mongoose.model('audio',audioSchema);