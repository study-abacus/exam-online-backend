module.exports = () => ({
  attributes: ['id', 'title', 'description', 'primaryPrice', 'secondaryPrice', 'start', 'registrationEnd'],
  meta: {
    pagination: records => records.pagination
  }
})