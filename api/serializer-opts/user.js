const ProfileSerializerOpts = require('./profile');

module.exports = () => ({
  attributes: ['id', 'name', 'email', 'verified', 'profile', 'roles'],
  profile: {
    ref: 'id',
    ...ProfileSerializerOpts(),
  },
});
