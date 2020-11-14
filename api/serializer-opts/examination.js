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
    'examAttempt',
    'practicePapers',
  ],
  questions: {
    ref: 'id',
    ignoreRelationshipData: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/examinations/${parent.id}/relationships/questions`,
    },
  },
  examAttempt: {
    ref: 'id',
    ignoreRelationshipData: true,
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) => `/api/examinations/${parent.id}/current-exam-attempt`,
    },
  },
  practicePapers: {
    ref: 'id',
    ignoreRelationshipData: true,
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/examinations/${parent.id}/relationships/practice-papers`,
    },
  },
  meta: {
    pagination: (records) => records.pagination,
  },
});
