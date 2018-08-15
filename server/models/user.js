const _ = require("lodash");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid emai!"
    }
  },
  password: {
    type: "String",
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: "String",
        required: true
      },
      token: {
        type: "String",
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  // var userObject = user.toObject();
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjczYzk0OTM5MjQ3ODI1ODg3MDAyZDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM0MzE0ODI1fQ.KtEmovapS-vsA83TPJ437hzC3MM-BjSbkj-QjddHweU

  return _.pick(user.toObject(), ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, "abc123")
    .toString();

  user.tokens.push({ access, token });
  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, "abc123");
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt
        .hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          next();
        })
        .catch(e => console.log("error occor while hashing ****", e));
    });
  } else {
    next();
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = { User };
