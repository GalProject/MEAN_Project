var mongoose = require('mongoose');

var adSchema = mongoose.Schema({
    messageName: String,
    messageID: Number,
    messageText: String,
    messagePics: [String],
    messageTemplatePath: String,
    messageNumOfSeconds: Number,
    // messageTimeSet:{startDateWithTime:String,endDateWithTime:String,numOfdaysToShow:[Number]}
    startDateWithTime: String,
    endDateWithTime: String,
    numOfdaysToShow: String

});

var Ad = mongoose.model('Ad', adSchema);

// router.get('/runit',function (req,res) {
//   res.render('./gal.html')
// });

module.exports = Ad;
