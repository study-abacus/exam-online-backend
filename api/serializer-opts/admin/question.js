const ChoiceSerializerOpts = require('./choice');

module.exports = () => ({
  attributes: ['id', 'title', 'description', 'type', 'questionAttempt', 'choices'],
  choices: {
    ref: 'id',
    ...ChoiceSerializerOpts(),
  },
  questionAttempt: {
    ref: 'id',
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/admin/questions/${parent.id}/current-question-attempt`,
    },
  },
  meta: {
    pagination: (records) => records.pagination,
  },
});
