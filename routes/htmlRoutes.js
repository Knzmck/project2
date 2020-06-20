const Router = require('express').Router;
const db = require('../models');
const htmlRoutes = new Router();

// HTML Route to index (render info on loading)
htmlRoutes.get('/', async (req, res) => {
  const dbGroups = await db.Group.findAll({});

  res.render('index', {
    msg: 'Welcome to the HomePage!',
    Groups: dbGroups
  });
});

// Render Group page with all content for 'study group'
htmlRoutes.get('/group/:id', async (req, res) => {
  const contentOptions = {
    where: {
      id: req.params.id
    }
  };

  const dbGroups = await db.Group.findOne(contentOptions);
  // reference to handlebars page
  res.render('group', {
    group: dbGroups
  });
});
