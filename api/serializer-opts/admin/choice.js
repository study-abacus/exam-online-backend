module.exports = () => ({
  attributes: ['id', 'title'],
  meta: {
    pagination: (records) => records.pagination,
  },
});
