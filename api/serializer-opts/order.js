module.exports = () => ({
  attributes: [
    'id', 
    'amount', 
    'description', 
    'examinations', 
    'isPaid', 
    'razorpayOrderId'
  ],
  meta: {
    pagination: records => records.pagination
  }
})
