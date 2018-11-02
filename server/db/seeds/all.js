const turf = require('@turf/turf');

const types = [
  'CEDAR',
  'SPRUCE',
  'PINE',
  'FIR'
];

function generateRandomTrees(site) {
  const total = Math.floor(Math.random() * 200) + 100;
  const type = Math.floor(Math.random() * types.length) + 1;
  const count = Math.floor(Math.random() * total) + 10;

  return turf.featureReduce(turf.randomPoint(count, {
    bbox: [
      Number(site.bounding.left),
      Number(site.bounding.bottom),
      Number(site.bounding.right),
      Number(site.bounding.top)
    ]
  }), function(previous, current) {
    return [
      ...previous,
      {
        lat: String(current.geometry.coordinates[1]),
        long: String(current.geometry.coordinates[0]),
        height: Math.floor(Math.random() * 69) + 1,
        site_id: site.id,
        tree_type_id: type
      }
    ]}
  , []);
}

const tables = [
  {
    id: 1,
    name: 'Cypress Provincial Park',
    sites: [
      {
        id: 1,
        name: 'East',
        bounding: {
          top: '49.387138',
          right: '-123.180439',
          bottom: '49.385008',
          left: '-123.187370'
        }
      },
      {
        id: 2,
        name: 'West',
        bounding: {
          top: '49.408148',
          right: '-123.219972',
          bottom: '49.406190',
          left: '-123.227091'
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Gambier Island',
    sites: [
      {
        id: 3,
        name: 'Lake',
        bounding: {
          top: '49.514182',
          right: '-123.397323',
          bottom: '49.512208',
          left: '-123.404006'
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Anvil Island',
    sites: [
      {
        id: 4,
        name: 'First Anvil',
        bounding: {
          top: '49.531146',
          right: '-123.299587',
          bottom: '49.527640',
          left: '-123.305804'
        }
      },
      {
        id: 5,
        name: 'Second Anvil',
        bounding: {
          top: '49.544438',
          right: '-123.301551',
          bottom: '49.538834',
          left: '-123.305928'
        }
      },
      {
        id: 6,
        name: 'Tip',
        bounding: {
          top: '49.555612',
          right: '-123.314210',
          bottom: '49.553009',
          left: '-123.322815'
        }
      }
    ]
  }
].reduce((previous, current) => {
  return {
    ...previous,
    projects: previous.projects.concat({ id: current.id, name: current.name }),
    sites: previous.sites.concat(current.sites.map(site => ({ ...site, project_id: current.id }))),
    trees: previous.trees.concat(current.sites.reduce((previous, site) => ([ ...previous, ...generateRandomTrees(site) ]), []))
  }
},
{
  projects: [],
  sites: [],
  trees: [],
  tree_types: types.map((type, index) => ({ id: index + 1, name: type }))
});

exports.seed = function(knex, Promise) {
  return Promise.all([
      'projects',
      'sites',
      'tree_types',
      'trees'
    ].map(table => knex(table).del())
  )
  .then(() => {
    return knex('projects').insert(tables.projects);
  })
  .then(() => {
    return knex('sites').insert(tables.sites);
  })
  .then(() => {
    return knex('tree_types').insert(types.map((type, index) => ({ id: index + 1, name: type })));
  })
  .then(() => {
    return knex('trees').insert(tables.trees);
  })
  .then(() => {
    return Promise.all(['projects', 'sites', 'tree_types'].map(table => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH ${tables[table].length + 1}`)));
  });
};
