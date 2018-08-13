const mongoose = require("mongoose");

// var modalOptions = mongoose.Schema({
//   text: { type: String, required: true, minlength: 2, trim: true },
//   completed: { type: Boolean, default: false },
//   completedAt: { type: Number, default: null }
// });
var Todo = mongoose.model("Todo", {
  text: { type: String, required: true, minlength: 2, trim: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Number, default: null }
});

module.exports = { Todo };
