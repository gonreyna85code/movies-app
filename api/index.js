const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
require("dotenv").config();
cookieSession = require("cookie-session");
const morgan = require("morgan");
var session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/routes");
const auth = require("./routes/auth");

app.name = "API";

app.use(
  cors({
    origin: "https://movieon.vercel.app",
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.all('*',function (req,res,next)
{
  
  if (req.method === "OPTIONS") {
    console.log("OPTIONS SUCCESS");
    res.next();
  }
});

mongoose.connect(process.env.MONGO, () => {
  console.log("Mongoose Is Connected");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secretcode",    
    store: MongoStore.create({ mongoUrl: process.env.MONGO }),    
  })
);

require("./passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);
app.use("/", auth);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

app.listen(process.env.PORT, () => {
  console.log("Server Has Started on port " + process.env.PORT);
});
