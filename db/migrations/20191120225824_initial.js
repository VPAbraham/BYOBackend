exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('teams', function(table) {
      table.increments('id').primary();
      table.string('team');
      table.string('abbreviation');
      table.unique('abbreviation');
      table.string('city');
      table.string('state');
      table.string('venue');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('players', function (table) {
      table.increments('id').primary();
      table.string('team');
      table.foreign('team')
           .references('teams.abbreviation');
      table.string('pos');
      table.integer('age');
      table.integer('gp');
      table.float('mpg');
      table.integer('fta');
      table.float('ftper');
      table.integer('_2pa');
      table.float('_2ptper');
      table.integer('_3pa');
      table.float('_3ptper');
      table.float('ppg');
      table.float('rpg');
      table.float('apg');
      table.float('spg');
      table.float('bpg');
      table.float('topg');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('teams')
  ])
};
