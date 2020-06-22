const Router = require('express').Router;
const { Feedback } = require('../../models');

const feedbackRoutes = Router();

// Get all examples -- route is /api/feedback
feedbackRoutes
  .route('/')

  .get(async (_req, res) => {
    const dbFeedbacks = await Feedback.findAll();
    res.json(dbFeedbacks);
  })

  .post(async (req, res) => {
    const dbFeedbacks = await Feedback.create(req.body);
    res.json(dbFeedbacks);
  });

// Delete an Group by id -- route is /api/feedback/id
feedbackRoutes
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
    const dbFeedbacks = await Feedback.destroy(options);
    res.json(dbFeedbacks);
  });
module.exports = feedbackRoutes;
