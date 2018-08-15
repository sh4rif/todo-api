const { ObjectID } = require("mongodb");

const { Todo } = require("../../models/todo");

const todos = [
  { _id: new ObjectID(), text: "First test todo" },
  {
    _id: new ObjectID(),
    text: "Second test to do",
    completed: true,
    completedAt: 333
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done())
    .catch(e => done("error occored in before each ", e));
};

module.exports = { todos, populateTodos };
