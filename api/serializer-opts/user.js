const ProfileSerializerOpts = require('./profile');

module.exports = () => ({
  attributes: ['id', 'name', 'verified', 'profile'],
  profile: {
    ref: 'id',
    ...ProfileSerializerOpts(),
  },
});
