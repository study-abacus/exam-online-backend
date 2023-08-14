module.exports = () => ({
  attributes: [
    'id',
    'title',
    'description',
    'examinations',
    'startDate',
    'endDate',
    'primaryPrice',
    'secondaryPrice',
  ],
  meta: {
    pagination: (records) => records.pagination,
  },
});
