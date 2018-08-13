const mongoose = require("mongoose");

const MONGO_ATLAS_UN = encodeURI("sh4rif@hotmail.co.uk");
const MONGO_ATLAS_PW = "Brierfield1!";

const atlasConStr =
  "mongodb+srv://" +
  MONGO_ATLAS_UN +
  ":" +
  MONGO_ATLAS_PW +
  "@cluster0-u8w2n.mongodb.net/test?retryWrites=true";
const conStr2 =
  "mongodb+srv://@cluster0-u8w2n.mongodb.net/test?retryWrites=true";

const objSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

mongoose.connect(
  conStr2,
  {
    auth: { user: MONGO_ATLAS_UN, password: MONGO_ATLAS_PW },
    useNewUrlParser: true
  }
);
mongoose.model("Product", objSchema);

console.log("Connected Successfully");

mongoose.disconnect();
