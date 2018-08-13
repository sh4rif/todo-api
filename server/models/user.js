const mongoose = require("mongoose");

// var modalOptions = mongoose.Schema({
//   email: { type: String, required: true, minlength: 2, trim: true }
// });

var User = mongoose.model("User", {
  email: { type: String, required: true, minlength: 2, trim: true }
});

module.exports = { User };
