const router = require('express').Router();
const projects = require('../db/mock/projects.json');

module.exports = (db) => {
  router.get('/', (request, response, next) => {
    response.json(projects);
  });

  return router;
}
