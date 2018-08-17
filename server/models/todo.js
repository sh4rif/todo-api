const mongoose = require("mongoose");

var TodoSchema = mongoose.Schema({
  text: { type: String, required: true, minlength: 2, trim: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Number, default: null },
  _creator: { type: mongoose.Schema.Types.ObjectId, required: true }
});
var Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Todo };
