const actions = require('./actions');
const express = require('express');

const routes = express.Router();

routes.get('/city', actions.getAllCity);
routes.get('/city/:id', actions.getSpecCity);
routes.post('/city', actions.createCity);
routes.put('/city/:id', actions.updCity);
routes.patch('/city/:id', actions.updSomeCity);
routes.delete('/city/:id', actions.deleteCity);


module.exports = routes;