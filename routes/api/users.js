const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const User = require("../../models/User");

// Load Input Validation
const registerValidate = require("../../validation/register");
const loginValidate = require("../../validation/login");

router.get("/test", (req, res) => {
  res.json({
    test: "Users work!!!",
    success: true
  });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = registerValidate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      });

      // hide the user password by bcrypt package
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          // brypt是一种封装密码的算法，使其存入数据库之前转换成乱码
          // if (err) {
          //   console.log(err);
          // }
          if (err) throw err;
          newUser.password = hash; // assign the password to hash

          // mongoose save()
          // promiss function just for show the object in postman
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user / Routing JWT(Json Web Token) Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // check if the email exists in DB
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // decode the password which is from DB, and match the plain password
    bcrypt.compare(password, user.password, (err, correct) => {
      // if decoding password process has fault, return message
      if (err) {
        errors.decodePassword = "Decode password failed";
        return res.status(400).json(errors);
      }

      // check if the password correct
      if (correct) {
        // create jwt as auth strategy
        const payload = {
          id: user.id,
          name: user.name
        };

        // after sign, the token will be storaged in local
        // the token is put into req
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "1d" },
          (err, token) => {
            res.json({
              msg: "Json web token produced",
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(404).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
// Jwt is storaged in local, passport.authenicate can recognize the local jwt
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
