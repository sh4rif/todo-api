const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

// Todo.remove({}).then(result => {
//   console.log(JSON.stringify(result, undefined, 2));
// });

var id = "5b71e69462443226a44b747b";
var text = "Something to do from Postman 36";
Todo.findOneAndRemove({ text }).then(doc => {
  console.log("Find one and remove", doc);
});
Todo.findByIdAndRemove(id).then(doc => console.log("Find By ID & remove", doc));
