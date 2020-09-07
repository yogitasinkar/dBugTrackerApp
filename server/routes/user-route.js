const express = require("express");
const userRouter = express.Router();
const passport = require("passport"); //npm package passport
const passportConfig = require("../passport");  // passport.js
const JWT = require("jsonwebtoken");

const User = require("../models/user-model");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Yogita",
      sub: userID,
    },
    "Memories",
    { expiresIn: "1h" }
  );
};


// REGISTER
userRouter.post("/register", 
  (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    username,
    password,
    role
  } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true, error:err } });
    if (user)
      res
        .status(400)
        .json({
          message: { msgBody: "Username is already taken", msgError: true },
        });
    else {
      const newUser = new User({
        firstname,
        lastname,
        email,
        phone,
        username,
        password,
        role,
      });
      newUser.save((err) => {
        if (err)
          res
            .status(500)
            .json({
              message: { msgBody: "Error has occured", msgError: true, error:err },
            });
        else
          res
            .status(201)
            .json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
      });
    }
  });
});


// LOGIN
userRouter.post("/login",
  passport.authenticate("local", { session: false }),  // "local" we created a localstraterfy in passportjs
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);


//  LOGOUT
userRouter.get("/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

// GET ALL USERS
userRouter.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({}).exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        res.status(200).json({ users: document, authenticated: true });
      }
    });
  }
);

// GET USER_BY_USERNAME
userRouter.get(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ username : req.params.username }).exec((err, document) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      else {
        res.status(200).json({ user: document, authenticated: true });
      }
    });
  }
);

// EDIT User/Profile
userRouter.post(
  "/:username/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.updateOne(
      { username: req.params.username },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    ).exec((err, document) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      else {
        res.status(200).json({ user: document, authenticated: true });
      }
    });
    })
  

// GET ADMIN ROUTE
userRouter.get("/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res
        .status(403)
        .json({
          message: { msgBody: "You're not an admin, go away", msgError: true },
        });
  }
);


// ISAUTHENTICATED ROUTE
userRouter.get("/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = userRouter;
