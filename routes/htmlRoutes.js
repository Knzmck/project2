const Router = require('express').Router;
const db = require('../models');
const htmlRoutes = new Router();

// Requiring our custom middleware for checking if a user is logged in. Routes with 'isAuthenticated' passed through are restricted routes for members only. 
var isAuthenticated = require("../config/middleware/isAuthenticated");

// HTML Route to index (render info on loading)
htmlRoutes.get('/', async (req, res) => {
  if (req.user) {
    const dbGroups = await db.Group.findAll({});
    // Where groups have association with ID 

    res.render('index', {
      // You can render any other information here
      msg: 'Welcome to the HomePage!',
      Groups: dbGroups
    });
  }
  res.render('signup')

});


// Render Group page with all content for 'study group' 
htmlRoutes.get('/group/:id',isAuthenticated, async (req, res) => {
  const contentOptions = {
    where: {
      id: req.params.id
    }
  };

  const dbGroups = await db.Group.findOne(contentOptions);
  // reference to specific handlebars page referring to group id above
  res.render('group', {
    group: dbGroups
  });
});

module.exports = htmlRoutes;