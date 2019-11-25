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
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './db/seeds'
    }
  }
};
