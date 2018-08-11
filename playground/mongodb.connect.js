const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true },
  (error, database) => {
    if (error) {
      return console.log("unable to connect to mongodb server: ", error);
    }

    console.log("Connected to mongoDB Server");

    const todoAppDB = database.db("TodoApp");

    /****************************** insert into Todos collection ******************************/
    // todoAppDB.collection("Todos").insertOne(
    //   {
    //     test: "something to do forth",
    //     completed: false
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unabel to insert todo", error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );

    // todoAppDB.collection("Users").insertOne(
    //   {
    //     name: "Muhammad Tahir Naeem",
    //     age: 40,
    //     location: "Lahore, Pakistan"
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert into Users Doc", error);
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    //   }
    // );

    database.close();
  }
);
