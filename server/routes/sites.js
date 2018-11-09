const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (request, response, next) => {
    db('select sites.id, sites.name, sites.bounding, trees.id as tree_id from sites, trees where trees.site_id = sites.id')
    .then(data => {
      console.log(data)
      let sites = {};

      sites.ids = Array.from(new Set(data.map(p => p.id)));
      sites.byId = data.reduce(( r, e ) => {
        if (r[e.id]){
          r[e.id].trees.push(e.tree_id);
        }else{
          r[e.id] = { id: e.id, name: e.name, bounding: e.bounding, trees: [e.tree_id] };
        }
        return r;
      }, {})
      
      response.json(sites);
    })
  });

  return router;
}
