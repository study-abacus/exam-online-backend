module.exports = {
  SERVER: {
    PORT: process.env.PORT || 6969,
    SECRET: process.env.APP_SECRET || 'abcd'
  },
  DB: {
    username: process.env.DB_USER || 'champ',
    password: process.env.DB_USER || 'champ',
    database: process.env.DB_USER || 'champ',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: "postgres",
    logging: process.env.DB_LOGGING || console.log
  },
  RAZORPAY: {
    ID: process.env.RAZORPAY_ID || 'rzp_test_Ou4rWUqLrEoS8l',
    SECRET: process.env.RAZORPAY_SECRET || 'vdfLK7y3YsLuhKfrcn7Bxo40'
  }
}
