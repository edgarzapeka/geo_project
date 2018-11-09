const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (request, response, next) => {
    db('select projects.id, projects.name, sites.id as site_id from projects, sites where projects.id = sites.project_id;')
    .then(data => {
      let projects = {byId: {}, ids: []};

      projects.ids = Array.from(new Set(data.map(p => p.id)));
      projects.byId = data.reduce(( r, e ) => {
        if (r[e.id]){
          r[e.id].sites.push(e.site_id);
        }else{
          r[e.id] = { id: e.id, name: e.name, sites: [e.site_id] };
        }
        return r;
      }, {})
      
      response.json(projects);
    })
  });

  return router;
}
