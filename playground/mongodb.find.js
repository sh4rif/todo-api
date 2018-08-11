const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true },
  (error, database) => {
    if (error) {
      return console.log("unable to connect to mongodb server: ", error);
    }

    console.log("Connected to mongoDB Server");

    const todoAppDB = database.db("TodoApp");

    // todoAppDB
    //   .collection("Todos")
    //   // .find({ completed: true })
    //   .find({ _id: new ObjectID("5b6d90cf363eb60af81b8008") })
    //   .toArray()
    //   .then(documents => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(documents, undefined, 2));
    //   })
    //   .catch(error => {
    //     console.log("Unable to fetch todos", error);
    //   });

    // todoAppDB
    //   .collection("Todos")
    //   .find()
    //   .count()
    //   .then(count => {
    //     console.log("Todos count:", count);
    //   })
    //   .catch(error => {
    //     console.log("Unable to fetch todos", error);
    //   });

    todoAppDB
      .collection("Users")
      .find({ name: /Muhammad/ })
      .toArray()
      .then(documents => {
        console.log(JSON.stringify(documents, undefined, 2));
      })
      .catch(error => {
        console.log("Unable to fetch Users", error);
      });

    database.close();
  }
);
