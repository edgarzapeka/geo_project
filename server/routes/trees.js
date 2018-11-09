const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (request, response, next) => {
    db('select trees.id, trees.lat, trees.long, trees.height, trees.site_id, tree_types.name as type from trees, tree_types where trees.tree_type_id = tree_types.id;')
    .then(data => {
      let trees = {};
      trees.byId = data.reduce((result, tree) => {
        result[tree.id] = tree
        return result;
      }, {})
      trees.ids = data.map(t => t.id);
     
      response.json(trees);
    })
  });

  return router;
}
