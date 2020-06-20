const Router = require('express').Router;
const db = require('../models');
const htmlRoutes = new Router();

// Requiring our custom middleware for checking if a user is logged in (pass isAuthenticated thru argument in route)
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get('/login', async (req, res) => {
    console.log('I am the login route');
    res.render('login', {
      msg: 'message'
    });
  });

  app.get('/', async (req, res) => {
    const dbExamples = await db.Example.findAll({});

    res.render('index', {
      msg: 'Welcome!',
      examples: squidstack_db
    });
  });

  // Load example page and pass in an example by id
  app.get('/example/:id', async (req, res) => {
    const options = {
      where: {
        id: req.params.id
      }
    };

    const dbExample = await db.Example.findOne(options);

    res.render('example', {
      example: dbExample
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', async (req, res) => {
    console.log('I am the * 404 route');
    res.render('404');
  });
};
