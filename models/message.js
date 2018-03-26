var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user')

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function(message) {
    User.findById(message.user, function (err, user) {
        user.messages.pull(message._id); //CHANGED HERE from message to message.user
        user.save();
    });
});

module.exports = mongoose.model('Message', schema);