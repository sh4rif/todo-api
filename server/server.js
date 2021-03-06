require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hellow World! ", process.env.MONGODB_URI);
});

app.post("/todos", authenticate, (req, res) => {
  var todo = new Todo({ text: req.body.text, _creator: req.user._id });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get("/todos", authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => {
      res.send({ todos });
    })
    .catch(e => {
      res.status(400).send(err);
    });
});

app.get("/todos/:todo", authenticate, (req, res) => {
  var todoId = req.params.todo;
  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send();
  }

  // Todo.findById(todoId)
  Todo.findOne({ _id: todoId, _creator: req.user._id })
    .then(todo => {
      if (!todo) return res.status(404).send();
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findOneAndRemove({ _id: id, _creator: req.user._id })
    .then(todo => {
      if (!todo) return res.status(404).send();

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.patch("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) return res.status(404).send();

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken().then();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => res.status(400).send(e));
});

// First Private Route
app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      // res.send(user);
      user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete("/users/me/token", authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log("Started on port ", port);
});

module.exports = { app };
