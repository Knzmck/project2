const Router = require('express').Router;
const groupRoutes = require('./groups');
const postRoutes = require('./posts')

const apiRoutes = Router();

apiRoutes.use('/groups', groupRoutes);
apiRoutes.use('/posts', postRoutes);

module.exports = apiRoutes;