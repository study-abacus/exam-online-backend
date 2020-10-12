module.exports = () => ({
  attributes: ['id', 'title', 'description', 'type', 'primaryPrice', 'secondaryPrice', 'start', 'registrationEnd'],
  meta: {
    pagination: records => records.pagination
  }
})