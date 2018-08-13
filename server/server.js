const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const User = require("./models/user");

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  // console.log(req.body);
  var todo = new Todo({ text: req.body.text });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log("Started on port ", port);
});

module.exports = { app };
