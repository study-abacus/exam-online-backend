const ExaminationSerializerOpts = require('./examination');
const UserSerializerOpts = require('./user');

module.exports = () => ({
  attributes: [
    'id',
    'start',
    'isSubmitted',
    'result',
    'examination',
    'user'
  ],
  examination: {
    ref: 'id',
    ...ExaminationSerializerOpts()
  },
  user: {
    ref: 'id',
    ...UserSerializerOpts()
  },
  meta: {
    pagination: records => records.pagination
  }
})
