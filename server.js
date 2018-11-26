const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

const db = keys.mongoDB_URI;

mongoose
  .connect(
    db, // local mode
    // process.env.MONGO_URI,     // production mode

    // The reason cause the deployment issue, Heroku's problem,
    // db URI should be like this format process.env.MONGO_URI in Heroku
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mlab db");
  })
  .catch(err => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
