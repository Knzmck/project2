const Router = require('express').Router;
const groupRoutes = require('./groups');

const apiRoutes = Router();

apiRoutes.use('/groups', groupRoutes);

module.exports = apiRoutes;