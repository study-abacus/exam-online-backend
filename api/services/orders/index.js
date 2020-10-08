const Sequelize = require('sequelize');
const DB = require('models');
const { isExaminationIdsCorrect, verifyRazorpaySignature } = require('./utils');
const ApiError = require('base/error');
const config = require('config');
const axios = require('axios');
const { toBase64 } = require('utils/base64');

class OrdersService {
  constructor(app) {
    const token = toBase64(`${config.RAZORPAY.ID}:${config.RAZORPAY.SECRET}`)

    this._app = app;
    this._axios = axios.create({
      baseURL: 'https://api.razorpay.com/v1/',
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
  }

  async createOrder(examinationIds, userId) {
    await isExaminationIdsCorrect(examinationIds);

    const examinations = await DB.examinations.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: examinationIds
        }
      }
    });
    const amount = examinations.reduce((acc, curr, i) => acc + (i === 0 ? +curr.primaryPrice : +curr.secondaryPrice), 0);

    const order = await DB.orders.create({
      amount,
      userId,
      examinations: examinationIds
    });

    return order;
  }

  async addOrderOnRazorpay(orderId) {
    const order = await DB.orders.findOne({
      where: {
        id: orderId,
        isPaid: false,
        razorpayOrderId: {
          [Sequelize.Op.eq]: null
        }
      }
    });

    if (!order) {
      throw new ApiError({
        title: 'Order not found'
      }, 404)
    }

    const resp = await this._axios.post('orders', {
      amount: order.amount,
      currency: 'INR'
    })
    order.razorpayOrderId = resp.data.id
    await order.save()

    return order
  }

  async captureOrder(paymentId, orderId, razorpaySignature) {
    const order = await DB.orders.findOne({
      id: orderId,
      isPaid: false
    })

    if (!order) {
      throw new ApiError({
        title: 'Order not found'
      }, 404)
    }

    if (!verifyRazorpaySignature(order.razorpayOrderId, paymentId, razorpaySignature)) {
      throw new ApiError({
        title: 'Invalid Signature'
      }, 400)
    }

    const resp = await this._axios.post(`payments/${paymentId}/capture`, {
      amount: order.amount,
      currency: 'INR'
    })

    if (resp.status !== 200) {
      throw new ApiError({
        title: 'Payment Failed'
      }, 500)
    }

    order.isPaid = true
    await order.save()
    
    return order
  }
}

module.exports = OrdersService;
