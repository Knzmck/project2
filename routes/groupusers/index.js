const Router = require('express').Router;
const { GroupUser } = require('../../models');

const groupUserRoutes = Router();

// Get all Users
groupUserRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbGroupUser = await GroupUser.findAll();
    res.json(dbGroupUser);
  })

  .post(async (req, res) => {
      console.log(req.body)
    const dbGroupUser = await GroupUser.create(req.body);
    res.json(dbGroupUser);
  });

// Delete a groupUser by id
groupUserRoutes
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
    const dbGroupUser = await GroupUser.destroy(options);
    res.json(dbGroupUser);
  });
module.exports = groupUserRoutes;
