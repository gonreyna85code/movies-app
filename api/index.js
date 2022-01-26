const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
require("dotenv").config();
const morgan = require("morgan");
var session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/routes");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");

app.name = "API";

app.use(
  cors({
    origin: "https://movieon.vercel.app",
    credentials: true,
  })
);

app.set('trust proxy', true);

// app.use((req, res, next) => {
//   if(req.method === 'OPTIONS') {
//     console.log('OPTIONS');
//     res.next()
//   }
//   res.header('Access-Control-Allow-Origin', 'https://movieon.vercel.app')
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
 
//   app.options('*', (res, req) => {
//    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
//    if(req.method === 'OPTIONS') {
//     console.log('OPTIONS');
//     res.next()
//   }
//   })
//  })

mongoose.connect(process.env.MONGO, () => {
  console.log("Mongoose Is Connected");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser("secretcode"));
app.use(morgan("dev"));

app.use(
  session({
    secret: "secretcode",
    resave: true,
    path: "/",
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO }),
   cookie: {      
      sameSite: 'none',
       secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
     }, 
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
