const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true },
  (error, database) => {
    if (error) {
      return console.log("error", error);
    }
    console.log("Connected to MongoDB");

    const db = database.db("TodoApp");

    // deleteMany
    // db.collection("Todos")
    //   .deleteMany({ test: "something to do forth" })
    //   .then(result => {
    //     console.log("Successfully deleted: ", result);
    //   })
    //   .catch(error => {
    //     console.log("error while deleting:", error);
    //   });

    // deleteOne
    // db.collection("Todos")
    //   .deleteOne({ test: "something to do two" })
    //   .then(result => {
    //     console.log("Successfully deleted: ", result);
    //   })
    //   .catch(error => {
    //     console.log("error while deleting:", error);
    //   });

    // findOneAndDelete
    // db.collection("Todos")
    //   .findOneAndDelete({ completed: true })
    //   .then(result => {
    //     console.log(result);
    //     // if (result.ok) {
    //     //   console.log("Successfully deleted: ", result.deletedCount);
    //     // }
    //   })
    //   .catch(error => {
    //     console.log("object not found:", error);
    //   });

    // db.collection("Todos")
    //   .findOneAndDelete({ _id: new ObjectID("5b6e8cbafe12d850aa81e660") })
    //   .then(document => {
    //     console.log(JSON.stringify(document, undefined, 2));
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    database.close();
  }
);
