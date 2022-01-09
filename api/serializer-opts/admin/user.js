const ProfileSerializerOpts = require('../profile');

module.exports = () => ({
  attributes: ['id', 'name', 'verified', 'profile', 'roles', 'examAttempts'],
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
