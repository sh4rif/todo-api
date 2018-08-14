const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

var jwtData = { id: 10 };

var token = jwt.sign(jwtData, "123abc");
console.log(token);

var verify = jwt.verify(token, "123abc");
console.log(verify);

// var message = "i am user number 3";
// var hashed = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hashed: ${hashed}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };

// console.log("token.hash:", token.hash);

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
// console.log("resultHash:", resultHash);

// if (resultHash === token.hash) {
//   console.log("data was not changed");
// } else {
//   console.log("Data was changed. Do not trust!");
// }
