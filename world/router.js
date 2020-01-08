var express = require('express');
var cityRoutes = require('./city/routes');

const appRouter = express.Router();

appRouter.use(cityRoutes);

module.exports = appRouter;