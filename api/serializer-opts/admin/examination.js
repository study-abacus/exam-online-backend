module.exports = () => ({
  attributes: [
    'id',
    'title',
    'description',
    'code',
    'type',
    'primaryPrice',
    'secondaryPrice',
    'start',
    'registrationEnd',
    'questions',
    'examAttempt',
    'practicePapers',
    'unlisted',
  ],
  questions: {
    ref: 'id',
    ignoreRelationshipData: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/admin/examinations/${parent.id}/relationships/questions`,
    },
  },
  examAttempt: {
    ref: 'id',
    ignoreRelationshipData: true,
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/admin/examinations/${parent.id}/current-exam-attempt`,
    },
  },
  practicePapers: {
    ref: 'id',
    ignoreRelationshipData: true,
    nullIfMissing: true,
    relationshipLinks: {
      related: (record, current, parent) =>
        `/api/admin/examinations/${parent.id}/relationships/practice-papers`,
    },
  },
  meta: {
    pagination: (records) => records.pagination,
  },
});
