module.exports = {
  apps : [{
    name: 'Examination Backend',
    script: 'api/app.js',
    instances: 'max',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
