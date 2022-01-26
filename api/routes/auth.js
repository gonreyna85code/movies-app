const Router = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = Router();


router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) throw err;
    if (!user) {res.send("No User Exists");
    console.log('No existe');}
    else {
      req.logIn(user, { session: true }, (err) => {
        if (err) throw err;
        console.log(req.user);
        return res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logOut(); // <-- not req.logout();
  res.send("Usuario no logueado");
});

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        publicKey: req.body.publicKey,
        profile: req.body.profile,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});



module.exports = router;
