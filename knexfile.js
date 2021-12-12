module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '0.0.0.0',
      user: 'postgres',
      database: 'scb-dev',
      password: '1234',
      port: '5432',
    },
    debug: false,
  },
};
