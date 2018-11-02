const router = require('express').Router();
const sites = require('../db/mock/sites.json');

module.exports = (db) => {
  router.get('/', (request, response, next) => {
    response.json(sites);
  });

  return router;
}
