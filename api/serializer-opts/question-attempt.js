const QuestionSerializerOpts = require('./question');
const ExamAttemptSerializerOpts = require('./exam-attempts');

module.exports = (model, type = 'serialize') => {
  if (type === 'deserialize') {
    return {
      questions: {
        valueForRelationship: (relationship) => ({ id: relationship.id }),
      },
    };
  }

  return {
    attributes: [
      'id',
      'answer',
      'question',
      'examAttempt'
    ],
    question: {
      ref: 'id',
      ...QuestionSerializerOpts(),
    },
    examAttempt: {
      ref: 'id',
      ...ExamAttemptSerializerOpts(),
    },
    meta: {
      pagination: (records) => records.pagination,
    },
  }
};
