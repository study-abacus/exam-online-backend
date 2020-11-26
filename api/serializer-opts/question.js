module.exports = () => ({
  attributes: ['id', 'title', 'description', 'type', 'questionAttempt'],
  questionAttempt: {
    ref: 'id',
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) => `/api/questions/${parent.id}/current-question-attempt`,
    },
  },
  meta: {
    pagination: (records) => records.pagination,
  },
});
