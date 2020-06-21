const Router = require('express').Router;
const { User } = require('../../models');
const { col } = require('sequelize');

const userRoutes = Router();

// Get all Users
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

// Delete a User by id
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
module.exports = userRoutes;
