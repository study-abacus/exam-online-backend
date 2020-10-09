const postSchema = {
  body: {
    type: 'object',
    required: [
      'examinationIds'
    ],
    properties: {
      examinationIds: {
        type: 'array',
        maxItems: 2,
        items: { type: 'integer' }
      }
    }
  }
}

const postCaptureSchema = {
  body: {
    type: 'object',
    required: [
      'razorpay_payment_id',
      'razorpay_order_id'
    ],
    properties: {
      razorpay_payment_id: {
        type: 'string'
      },
      razorpay_order_id: {
        type: 'string'
      }
    }
  }
}

module.exports = {
  postSchema,
  postCaptureSchema
}
