var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Ad = require('./ad.model.js');
// var myHtml = require('../views/gal');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs
  // select all
  app.get('/ads', function(req, res) {
    Ad.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/ads/count', function(req, res) {
    Ad.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/ad', function(req, res) {
    var obj = new Ad(req.body);
    console.log(obj)
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/ad/:id', function(req, res) {
    Ad.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/ad/:id', function(req, res) {
    Ad.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/ad/:id', function(req, res) {
    Ad.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });


  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  // // runit init
  // app.get('/runit', function(req, res) {
  //   res.sendfile(__dirname + '/gal.html')
  // });



  var dataFromMongoDB = new Array();
  var screenid;
  var cursor;
  var errorPage = {
    messageName: "message6",
    messageID:[0],
    messageText: "ERROR PAGE 404",
    messagePics: [{"bannerImg1" : "images/404.png"}],
    messageTemplatePath: "./template404.html",
    messageNumOfSeconds: "2000",
  };

  // router.get('/runit', function(req, res) {
  //   console.log("Im Here");
  //   if (req.params.id.toString() != "data"){
  //     var numOfTemplate =  req.params.id.toString(); //params to string
  //     numOfTemplate = numOfTemplate.charAt(7); //"1"
  //     screenid = numOfTemplate;
  //   }
  //
  //   switch (req.params.id)
  //   {
  //     case 'screen=1':
  //       goToMongo(1)
  //       res.sendfile(__dirname + "/main.html")
  //       break;
  //     case 'screen=2':
  //       goToMongo(2)
  //       res.sendfile(__dirname + "/main.html");
  //       break;
  //     case 'screen=3':
  //       goToMongo(3)
  //       res.sendfile(__dirname + "/main.html");
  //       break;
  //     case 'data':{
  //       dataFromMongoDB.push(errorPage);
  //       res.send(dataFromMongoDB);
  //       dataFromMongoDB.splice(0,dataFromMongoDB.length)
  //       break;
  //     }
  //     case 'insert':{
  //       var data = [
  //         {
  //           messageName: "message1",
  //           messageID:[1,2],
  //           messageText: "ellentesque habitant morbi" +
  //           "tristique" +
  //           "senectus" +
  //           "et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae",
  //           messagePics: [{"bannerImg1": "images/b.png"},{"bannerImg1" : "images/c.png"}],
  //           messageTemplatePath: "./templateA.html",
  //           messageNumOfSeconds: "4000",
  //           messageTimeSet:{startDateWithTime:"2016-1-1 6:00:00",endDateWithTime:"2017-12-31 23:00:00",numOfdaysToShow:[0,1,2,3]}
  //         },
  //         {
  //           messageName: "message2",
  //           messageID:[1,3],
  //           messageText: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
  //           "Aliquam tincidunt mauris eu risus." +
  //           "Vestibulum auctor dapibus neque." +
  //           "luctus turpis elit sit amet quam." +
  //           "luctus turpis elit sit amet quam." +
  //           "luctus turpis elit sit amet quam." +
  //           "luctus turpis elit sit amet quam." +
  //           "luctus turpis elit sit amet quam." +
  //           "luctus turpis elit sit amet quam." +
  //           "luctus turpis elit sit amet quam." +
  //           "Vivamus pretium ornare est",
  //           messagePics: [{"bannerImg1" : "images/a.png"}],
  //           messageTemplatePath: "./templateB.html",
  //           messageNumOfSeconds: "4000",
  //           messageTimeSet:{startDateWithTime:"2016-3-1 10:00:00",endDateWithTime:"2017-4-30 16:00:00",numOfdaysToShow:[0,1,2,3]}
  //         },
  //         {
  //           messageName: "message3",
  //           messageID:[2,3],
  //           messageText: null,
  //           messagePics: null,
  //           messageTemplatePath: "./templateC.html",
  //           messageNumOfSeconds: "2000",
  //           messageTimeSet:{startDateWithTime:"2016-5-1 8:00:00",endDateWithTime:"2017-6-15 22:00:00",numOfdaysToShow:[0,1,2,3,4,5,6]}
  //         },
  //         {
  //           messageName: "message4",
  //           messageID:[1],
  //           messageText: "blablalba" +
  //           "asdasmyuoylnyulnyuol",
  //           messagePics: null,
  //           messageTemplatePath: "./templateA.html",
  //           messageNumOfSeconds: "3000",
  //           messageTimeSet:{startDateWithTime:"2016-3-29 12:00:00",endDateWithTime:"2017-4-15 19:00:00",numOfdaysToShow:[0,1,2,3,4]}
  //         },
  //         {
  //           messageName: "message5",
  //           messageID:[3],
  //           messageText: "aslkjdngfkjlasdgnlkjsanklgvnskljtvnwlkjtnv" +
  //           "vawotjnwlkjetvnlkawejtnvlakjwent" +
  //           "vawetjklwnaeklvtnawektvjnakwlt" +
  //           "vawlkjetvnawkjlevntkawlnetvlkjawe" +
  //           "asdasd5674n58n45" +
  //           "n45823b515b32151235b2345b3" +
  //           "b2356357n347n347n57n75n",
  //           messagePics: [{"bannerImg1" : "images/f.png"}],
  //           messageTemplatePath: "./templateB.html",
  //           messageNumOfSeconds: "2000",
  //           messageTimeSet:{startDateWithTime:"2016-4-1 1:00:00",endDateWithTime:"2017-4-30 23:00:00",numOfdaysToShow:[0,1,2,3]}
  //         },
  //         {
  //           messageName: "message6",
  //           messageID:[0],
  //           messageText: "ERROR PAGE 404",
  //           messagePics: [{"bannerImg1" : "images/404.png"}],
  //           messageTemplatePath: "./template404.html",
  //           messageNumOfSeconds: "2000",
  //         },
  //       ];
  //       mongo.connect(url,function (err,db) {
  //         assert.equal(null,err);
  //         db.collection('message-data').insert(data,function (err,result) {
  //           assert.equal(null,err);
  //           console.log("Item Insert");
  //           db.close();
  //         });
  //       });
  //       break;
  //     }
  //     default:
  //       res.send("404 - Please Valid Your URL: http://localhost:8080/screen=1 or screen=2 or screen=3");
  //       break;
  //   }
  //
  // });
  // // router.get('/', function(req, res, next) {
  // //   res.send("404 - Please Valid Your URL: http://localhost:8080/screen=1 or screen=2 or screen=3");
  // // });
  // function goToMongo(i){
  //   mongo.connect(url, function(err, db) {
  //     assert.equal(null, err);
  //     findMessages(db, function() {
  //       db.close();
  //     });
  //   });
  //   var findMessages = function(db, callback) {
  //     cursor =db.collection('message-data').find({"messageID": {"$in": [i]}});
  //     cursor.each(function(err, doc) {
  //       assert.equal(err, null);
  //       if (doc != null) {
  //         dataFromMongoDB.push(doc);
  //       } else {
  //         callback();
  //       }
  //     });
  //   };
  // }

  // app.use('/runit',myHtml);

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});

module.exports = app;
