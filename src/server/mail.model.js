var mongoose = require('mongoose');

var mailSchema = mongoose.Schema({
    emailAddressMail: String,
    messageMail: String

});

var Mail = mongoose.model('Mail', mailSchema);


module.exports = Mail;
