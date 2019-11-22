// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nbastats',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds : {
      directory: './db/seeds'
    }
  }
};
