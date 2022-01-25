const mongoose = require("mongoose");



const user =  mongoose.Schema({  
  username: String,
  password: String,
  profile: Object,
  name: String,
  email: String,  
});

module.exports = mongoose.model("User", user);
