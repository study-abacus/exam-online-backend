const ProfileSerializerOpts = require('../profile');
const UserLocalSerializerOpts = require('./user-local');

module.exports = () => ({
  attributes: ['id', 'name', 'verified', 'phone', 'profile', 'roles', 'examAttempts', 'userLocal'],
  userLocal: {
    ref: 'id',
    ...UserLocalSerializerOpts(),
  },
  profile: {
    ref: 'id',
    ...ProfileSerializerOpts(),
  },
  examAttempts: {
    ref: 'id',
    ignoreRelationshipData: true,
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/admin/users/${parent.id}/relationships/exam-attempts`,
    },
  },
});
