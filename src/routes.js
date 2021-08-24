const { Router } = require('express');
const QueueController = require('./controllers/QueueController');

const routes = new Router();

routes.post("/add", QueueController.store)

module.exports = routes;