module.exports = {
  apps : [{
    name: 'Examination Backend',
    script: 'api/app.js',
    instances: 'max',
    env: {
      NODE_PATH: 'api',
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_PATH: 'api',
      NODE_ENV: 'production'
    }
  }]
};
