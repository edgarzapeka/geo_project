const router = require('express').Router();
const trees = require('../db/mock/trees.json');

module.exports = (db) => {
  router.get('/', (request, response, next) => {
    response.json(trees);
  });

  return router;
}
