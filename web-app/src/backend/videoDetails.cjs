const mongoose = require('mongoose');

const videoDetailsSchema = new mongoose.Schema({
    video: String,
    title: String,
    perm: String
}, {collection: 'VideoDetails'});

mongoose.model('VideoDetails', videoDetailsSchema);