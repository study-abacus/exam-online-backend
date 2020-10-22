module.exports = () => ({
  attributes: [
    'id',
    'title',
    'description',
    'type',
  ],
  meta: {
    pagination: records => records.pagination
  }
})
  