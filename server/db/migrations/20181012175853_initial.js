exports.up = function(knex, Promise) {
  return Promise.resolve()
  .then(() => {
    return knex.schema.createTable('projects', function(table) {
      table.increments();
      table.string('name');
    });
  })
  .then(() => {
    return knex.schema.createTable('sites', function(table) {
      table.increments();
      table.string('name');
      table.json('bounding');
      table.integer('project_id').references('projects.id').onDelete('CASCADE');
    });
  })
  .then(() => {
    return knex.schema.createTable('tree_types', function(table) {
      table.increments();
      table.string('name');
    })
  })
  .then(() => {
    return knex.schema.createTable('trees', function(table) {
      table.increments();
      table.string('lat');
      table.string('long');
      table.integer('height');
      table.integer('site_id').references('sites.id').onDelete('CASCADE');
      table.integer('tree_type_id').references('tree_types.id').onDelete('CASCADE');
    });
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve()
  .then(() => knex.schema.dropTable('projects'))
  .then(() => knex.schema.dropTable('sites'))
  .then(() => knex.schema.dropTable('tree_types'))
  .then(() => knex.schema.dropTable('trees'));
};
