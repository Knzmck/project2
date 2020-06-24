const Router = require('express').Router;
const groupRoutes = require('./groups');
const postRoutes = require('./posts');
const feedbackRoutes = require('./feedback');
const userRoutes = require('./users');
const groupUserRoutes = require('./groupusers');

const apiRoutes = Router();

apiRoutes.use('/groups', groupRoutes);
apiRoutes.use('/posts', postRoutes);
apiRoutes.use('/feedback', feedbackRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/groupusers', groupUserRoutes);

module.exports = apiRoutes;