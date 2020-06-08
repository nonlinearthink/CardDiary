const jwt = require("jsonwebtoken")
const random = require("string-random");

var content = {
  username: "zxj",
  msg: "Logging in",
  jammer: random(32)
}
var privateKey = random(16);
var token = jwt.sign(content,privateKey,{expiresIn: 60*60*24});

console.log(privateKey);
console.log(token);

jwt.verify(token,privateKey,(err,decode)=>{
  if(err){
    console.log(err);
  }else{
    console.log(decode);
  }
})