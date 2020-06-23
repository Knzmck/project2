const Router = require('express').Router;
const { Group } = require('../../models');

const groupRoutes = Router();

// Get all examples -- route is /api/groups
groupRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbGroups = await Group.findAll();
    res.json(dbGroups);
  })
// create a new group
  .post(async (req, res) => {
    const dbGroups = await Group.create(req.body);
    res.json(dbGroups);
  });

// Delete an Group by id -- route is /api/groups/id
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
    const dbGroup = await Group.destroy(options);
    res.json(dbGroup);
  });
module.exports = groupRoutes;
