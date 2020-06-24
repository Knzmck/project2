const Router = require('express').Router;
var passport = require("../../config/passport");
const { User } = require('../../models');
const { col } = require('sequelize');

const userRoutes = Router();

// Get all Users - route is /api/users
userRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbUsers = await User.findAll();
    res.json(dbUsers);
  })

  .post(async (req, res) => {
      console.log(req.body)
    const dbUsers = await User.create(req.body);
    res.json(dbUsers);
  });

// Delete a User by id -- route is /api/users/id 
userRoutes
  .route('/:id')
  .put(async (_req, res) => {
    res.status(501).end();
  })
  .delete(async (req, res) => {
    const options = {
      where: {
        id: req.params.id
      }
    };
    const dbUsers = await User.destroy(options);
    res.json(dbUsers);
  });

// API ROUTE TO LOG IN- checks with model and passport.js to see if email and password match
// route is /api/users/login
userRoutes
.route('/login')

.post(passport.authenticate("local"), async (req,res) => {
  const id = {
    where: {
      email: req.body.email
    }
  }
  const dbUsers = await User.findOne(id);
  res.json(dbUsers);
})
// API ROUTE TO SIGN UP -- route is /api/users/signup
userRoutes
.route('/signup')

.post(async (req, res) => {
  console.log(req.body)
const dbUsers = await User.create(req.body);
res.json(dbUsers);
});

// API route to get the user's data who is logged in. Will be useful for making posts. Route is -- /api/users/user_data
userRoutes
.route('/user_data')

.get(async (req,res) => {
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
})

module.exports = userRoutes;
