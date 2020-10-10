const ProfileSerializerOpts = require('./profile');

module.exports = () => ({
  attributes: ['id', 'name', 'email', 'verified', 'profile'],
  profile: {
    ref: 'id',
    ...ProfileSerializerOpts()
  }
})
