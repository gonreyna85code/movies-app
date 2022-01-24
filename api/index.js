const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
require("dotenv").config();
const morgan = require("morgan");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const port = 3001;


app.name = "API";

app.use(cors({ origin: ["http://localhost:3000", "https://eventy-main.vercel.app"], credentials: true }));

app.set("trust proxy", 1);

mongoose.connect(
  process.env.MONGO,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Mongoose Is Connected");
  }
);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  session({
    secret: "secretcode",
    resave: false,
    path: "/",
    proxy: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO }),
   cookie: {      
      sameSite: 'none',
       secure: true,
       maxAge: 60 * 60 * 1000 * 24 * 365,
     }, 
  })
);

require("./passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
