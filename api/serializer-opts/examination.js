module.exports = () => ({
  attributes: [
    'id',
    'title',
    'description',
    'type',
    'primaryPrice',
    'secondaryPrice',
    'start',
    'registrationEnd',
    'questions',
    'examAttempt'
  ],
  questions: {
    ref: 'id',
    ignoreRelationshipData: true,
    relationshipLinks: {
      related: (record, current, parent) => `/api/examinations/${parent.id}/relationships/questions`
    }
  },
  examAttempt: {
    ref: 'id',
    ignoreRelationshipData: true,
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) => `/api/examinations/${parent.id}/current-exam-attempt`
    }
  },
  meta: {
    pagination: (records) => records.pagination,
  },
});
