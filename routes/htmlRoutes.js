const Router = require('express').Router;
const db = require('../models');
const htmlRoutes = new Router();


// HTML Route to index (render info on loading)
htmlRoutes.get('/', async (req, res) => {
  const dbGroups = await db.Group.findAll({});

  res.render('index', {
    // You can render any other information here
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
  // reference to specific handlebars page referring to group id above
  res.render('group', {
    group: dbGroups
  });
});

module.exports = htmlRoutes;