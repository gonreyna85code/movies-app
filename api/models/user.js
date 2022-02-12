const mongoose = require("mongoose");



const user =  mongoose.Schema({  
  id: String,
  username: String,
  password: String,  
  name: String,
  email: String,  
});

module.exports = mongoose.model("User", user);
