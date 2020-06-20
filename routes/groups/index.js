const Router = require('express').Router;
const { Group } = require('../../models');

const groupRoutes = Router();

// Get all examples
groupRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbGroups = await Group.findAll();
    res.json(dbGroups);
  })

  .post(async (req, res) => {
    const dbGroups = await Group.create(req.body);
    res.json(dbGroups);
  });

// Delete an Group by id
groupRoutes
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
    const dbExample = await Example.destroy(options);
    res.json(dbExample);
  });
module.exports = groupRoutes;
