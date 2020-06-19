const Router = require('express').Router;
const exampleRoutes = require('./examples');

const apiRoutes = Router();

apiRoutes.use('/examples', exampleRoutes);

module.exports = apiRoutes;


// Requiring our models
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
// Login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

// Finds all usernames and info
app.get("/api/getall", function(req, res) {
  db.User.findAll().then(function(results){
    res.send(results);
  })
})
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log("hello")
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/addGroup", (req,res) => {
    console.log(req.body)
    db.Group.create({
      name: req.body.name,
      description: req.body.description
    })
    .then(() => {
      res.end();
    })
  })
};

