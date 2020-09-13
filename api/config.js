module.exports = {
  SERVER: {
    PORT: process.env.PORT || 6969
  },
  DB: {
    HOST: process.env.DB_HOST || '127.0.0.1',
    USER: process.env.DB_USER || 'champ',
    PASS: process.env.DB_PASS || 'champ'
  }
}