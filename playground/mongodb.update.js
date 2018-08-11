const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true },
  (error, database) => {
    if (error) {
      return console.log("Unable to connect to mongodb!");
    }

    console.log("Connected Successfully");

    var db = database.db("TodoApp");

    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     { _id: new ObjectId("5b6d9075115526357c332b08") },
    //     { $set: { completed: true } },
    //     { returnOriginal: false }
    //   )
    //   .then(result => {
    //     console.log(JSON.stringify(result, undefined, 2));
    //   });

    db.collection("Users")
      .findOneAndUpdate(
        { _id: new ObjectId("5b6d96fd0d1d1738d02c01e7") },
        { $inc: { age: 1 } },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(JSON.stringify(result, undefined, 2));
      })
      .catch(error => {
        console.log(error);
      });

    database.close();
  }
);

// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

// // Connection URL
// const url = "mongodb://localhost:27017";

// // Database Name
// const dbName = "TodoApp";

// // Use connect method to connect to the Server
// MongoClient.connect(
//   url,
//   { useNewUrlParser: true },
//   (err, client) => {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");

//     const db = client.db(dbName);

//     client.close();
//   }
// );
