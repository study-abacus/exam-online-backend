module.exports = {
  SERVER: {
    PORT: process.env.PORT || 6969
  },
  DB: {
    username: process.env.DB_USER || 'champ',
    password: process.env.DB_USER || 'champ',
    database: process.env.DB_USER || 'champ',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: "postgres",
    logging: process.env.DB_LOGGING || console.log
  }
}
