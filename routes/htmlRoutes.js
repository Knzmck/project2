const Router = require('express').Router;
const db = require('../models');
const htmlRoutes = new Router();

// Requiring our custom middleware for checking if a user is logged in. Routes with 'isAuthenticated' passed through are restricted routes for members only. 
var isAuthenticated = require("../config/middleware/isAuthenticated");

// HTML Route to index (render info on loading) - must be logged in or will redirect you to sign up page
htmlRoutes.get('/', async (req, res) => {
  if (req.user) {
    res.redirect('/homepage');
  }
  res.render('signup')

});

// Route for homepage
htmlRoutes.get('/homepage',isAuthenticated, async (req, res) => {
    // Finding all groups to join
    const dbGroups = await db.Group.findAll({});
    // // Find all groups associated with this user
    // const dbUserGroup = await db.GroupUser.findAll({
    //   where: req.user.id
    // })

    res.render('index', {
      // You can render any other information here
      msg: 'Welcome to the HomePage!',
      groups: dbGroups
    });
})

// Route for login page
htmlRoutes.get('/login', async (req, res) => {
 res.render('login')
})
// Route for signup page
htmlRoutes.get('/signup', async (req,res) => {
  res.render('signup')
})



// Render Group page with all content for group. For example, 'study group' 
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



// Render content page for specific resource(aka post) within group using group ID in route
// htmlRoutes.get('/post/:id', async (req, res) => {
//   const groupPosts = {
//     where: {
//       GroupId: req.params.id
//     }
//   };

//   const dbPosts = await db.Post.find(groupPosts);
//   // reference to specific handlebars page referring to group id above
//   // res.render('content', {
//   //   content: dbPosts
//   // });
//   res.send(dbPosts)
// });

module.exports = htmlRoutes;