const ProfileSerializerOpts = require('../profile');

module.exports = () => ({
  attributes: ['id', 'name', 'verified', 'profile', 'roles'],
  profile: {
    ref: 'id',
    ...ProfileSerializerOpts(),
  },
});
