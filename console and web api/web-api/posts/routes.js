var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPosts);
routes.post('/', actions.createPost);
routes.delete('/', actions.deletePosts);
routes.delete('/:id', actions.deleteUserPosts);

module.exports = routes;