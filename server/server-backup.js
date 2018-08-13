const { mongoose } = require("./db/mongoose");
// var modalName = "Todo";
// var modalOptions = mongoose.Schema({
//   text: { type: String, required: true, minlength: 2, trim: true },
//   completed: { type: Boolean, default: false },
//   completedAt: { type: Number, default: null }
// });

// var Todo = mongoose.model(modalName, modalOptions);

// console.log("connected successfully");

// new Todo({
//   text: "Go for a walk!",
//   completed: false,
//   completedAt: 456789232
// })
//   .save()
//   .then(doc => {
//     console.log("Saved Todo:", doc);
//     mongoose.disconnect();
//   })
//   .catch(error => {
//     console.log("Unable to save to do", error);
//     mongoose.disconnect();
//   });

// new Todo({ text: " dad   " })
//   .save()
//   .then(result => {
//     console.log(JSON.stringify(result, undefined, 2));
//     mongoose.disconnect();
//   })
//   .catch(error => {
//     if (error.name === "ValidationError") {
//       console.log("some fields was required", error._message);
//     } else {
//       console.log("Some other errors: ", error);
//     }
//     mongoose.disconnect();
//   });

/*
const modalUser = "User";
const userModalOptions = mongoose.Schema({
  email: { type: String, required: true, minlength: 2, trim: true }
});

new User = mongoose.model(modalUser, userModalOptions);

new User({})
  .save()
  .then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
    mongoose.disconnect();
  })
  .catch(error => {
    console.log('ERROR:', error); 
    mongoose.disconnect();
  });
  */

var modalName = "User";
var modalOptions = mongoose.Schema({
  email: { type: String, required: true, minlength: 2, trim: true }
});

var User = mongoose.model(modalName, modalOptions);

console.log("connected successfully");

new User({ email: "mail@mail.com" })
  .save()
  .then(doc => {
    console.log("Saved Todo:", doc);
    mongoose.disconnect();
  })
  .catch(error => {
    console.log("Unable to save to do", error);
    mongoose.disconnect();
  });
