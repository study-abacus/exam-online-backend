module.exports = {
  APP: {
    ENV: process.env.NODE_ENV || 'development',
  },
  SERVER: {
    PORT: process.env.PORT || 6969,
    SECRET: process.env.APP_SECRET || 'abcd',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',
  },
  DB: {
    username: process.env.DB_USER || 'champ',
    password: process.env.DB_PASS || 'champ',
    database: process.env.DB_NAME || 'champ',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: process.env.DB_LOGGING || console.log,
  },
  RAZORPAY: {
    ID: process.env.RAZORPAY_ID || 'rzp_test_Ou4rWUqLrEoS8l',
    SECRET: process.env.RAZORPAY_SECRET || 'vdfLK7y3YsLuhKfrcn7Bxo40',
  },
  SENDGRID: {
    KEY: process.env.SENDGRID_KEY || 'bleh',
  },
  MINIO: {
    BUCKET_NAME: 'recordings',
    ENDPOINT: process.env.MINIO_ENPOINT || '127.0.0.1',
    ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minio',
    SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minio123',
    PORT: Number(process.env.MINIO_PORT || '80'),
  },
  TWILIO: {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PASSWORD: process.env.REDIS_PASS,
  },
};
