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

UserSchema.methods.removeToken = function(token) {
  var user = this;
  return user.update({ $pull: { tokens: { token } } });
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

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject();

      return bcrypt
        .compare(password, user.password)
        .then(res => {
          return res ? user : Promise.reject();
        })
        .catch(e => Promise.reject());
    })
    .catch(e => Promise.reject());
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
