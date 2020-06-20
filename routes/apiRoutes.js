const Router = require('express').Router;
const groupRoutes = require('./groups');
const postRoutes = require('./posts')
const feedbackRoutes = require('./feedback');

const apiRoutes = Router();

apiRoutes.use('/groups', groupRoutes);
apiRoutes.use('/posts', postRoutes);
apiRoutes.use('/feedback', feedbackRoutes);

module.exports = apiRoutes;