const ExaminationSerializerOpts = require('./examination');
const UserSerializerOpts = require('./user');
const EventSerializerOpts = require('./event');

module.exports = () => ({
  attributes: [
    'id',
    'start',
    'isSubmitted',
    'submittedAt',
    'result',
    'examination',
    'user',
    'certificate',
  ],
  examination: {
    ref: 'id',
    ...ExaminationSerializerOpts(),
  },
  event: {
    ref: 'id',
    ...EventSerializerOpts(),
  },
  user: {
    ref: 'id',
    ...UserSerializerOpts(),
  },
  meta: {
    pagination: (records) => records.pagination,
  },
});
