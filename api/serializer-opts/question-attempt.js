const QuestionSerializerOpts = require('./question');
const ExamAttemptSerializerOpts = require('./exam-attempts');

module.exports = () => ({
  attributes: [
    'id',
    'answer',
    'question',
    'examAttempt'
  ],
  question: {
    ref: 'id',
    ...QuestionSerializerOpts()
  },
  examAttempt: {
    ref: 'id',
    ...ExamAttemptSerializerOpts()
  },
  meta: {
    pagination: records => records.pagination
  }
})
