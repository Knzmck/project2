const Router = require('express').Router;
const { Post } = require('../../models');
const { col } = require('sequelize');

const postRoutes = Router();

// Get all Posts route is /api/posts
postRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbPosts = await Post.findAll();
    res.json(dbPosts);
  })

  .post(async (req, res) => {
    console.log(req.body)
    const dbPosts = await Post.create(req.body);
    res.json(dbPosts);
  });

// Delete a Post by id -- route is /api/posts/id
postRoutes
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
    const dbPost = await Post.destroy(options);
    res.json(dbPost);
  });

  // Route to create new post 
postRoutes
  .route('/newpost')
  .post(async (req, res) => {
    console.log(req.body)
    const dbPosts = await Post.create(req.body);
    res.json(dbPosts);
  });

module.exports = postRoutes;
