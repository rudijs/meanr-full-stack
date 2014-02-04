var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27018/meanr-test', function (err, db) {

  if (err) {
    //throw err;
    console.log('MongoDB connection fail');
    process.exit(1);
  }

  //db.close();
  //console.log('MongoDB connection OK');
  //process.exit(0);

  var collection = db.collection('ci_test_insert');

  var currentDateTime = new Date().toString();

  collection.insert({"currentDateTime": currentDateTime}, function (err, docs) {

    collection.findOne({"currentDateTime": currentDateTime}, function (err, results) {

      if (err) {
        //throw err;
        console.log('MongoDB connection fail');
        process.exit(1);
      }

      if (!results) {
        //throw err;
        console.log('MongoDB connection fail');
        process.exit(1);
      }

      console.log('MongoDB connection OK');
      // Let's close the db
      db.close();

    });

  });

})
