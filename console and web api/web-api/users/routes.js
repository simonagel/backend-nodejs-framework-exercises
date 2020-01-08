var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/', actions.getAllUsers);
routes.get('/:id', actions.getSpecificUser);
routes.post('/', actions.createUser);
routes.post('/users', actions.createUsers);
routes.delete('/', actions.deleteUsers);
routes.delete('/:id', actions.deleteUser);



routes.put('/:id', (req, res) => {
    res.send("Full update for user with id = " + req.params.id);
});



module.exports = routes;