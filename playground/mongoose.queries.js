const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

var todo_id = "5b716329a3ec654a6488ef2d11";
var user_id = "5b6ee242ca50b72274cad8bd";

// if (!ObjectID.isValid(todo_id)) {
//   console.log("Todo ID not valid!");
// } else {
// Todo.find({ _id: todo_id }).then(todo => {
//   console.log("Todos", JSON.stringify(todo, undefined, 2));
// });
// Todo.findOne({ _id: todo_id }).then(todo => {
//   console.log("Todo", JSON.stringify(todo, undefined, 2));
// });
// Todo.findById(todo_id)
//   .then(todo => {
//     if (!todo) return console.log("Id not found");
//     console.log("Todo by ID", JSON.stringify(todo, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }

if (!ObjectID.isValid(user_id)) {
  console.log("USer ID not valid");
} else {
  User.findById(user_id)
    .then(user => {
      if (!user) return console.log("Unable to finde User");
      console.log(JSON.stringify(user, undefined, 2));
    })
    .catch(e => {
      console.log(e);
    });
}
