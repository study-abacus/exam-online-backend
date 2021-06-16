const Sequelize = require('sequelize');
const DB = require('models');
const { isExaminationIdsCorrect, verifyRazorpaySignature } = require('./utils');
const ApiError = require('base/error');
const config = require('config');
const axios = require('axios');
const { toBase64 } = require('utils/base64');

class OrdersService {
  constructor(app) {
    const token = toBase64(`${config.RAZORPAY.ID}:${config.RAZORPAY.SECRET}`);

    this._app = app;
    this._axios = axios.create({
      baseURL: 'https://api.razorpay.com/v1/',
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
  }

  async createOrder(examinationIds, userId) {
    const prevOrder = await DB.orders.findOne({
      where: {
        userId,
        isPaid: true,
      },
    });

    if (prevOrder) {
      throw new ApiError(
        {
          title: 'Application already exists',
        },
        400,
      );
    }

    await isExaminationIdsCorrect(examinationIds);

    const examinations = await DB.examinations.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: examinationIds,
        },
      },
    });

    // Custom checks because why choose life?
    if (examinations.length > 1) {
      throw new ApiError(
        {
          title: 'Only 1 examinations allowed',
        },
        400,
      );
    }
    if (
      examinations.length == 2 &&
      examinations[0].type !== 'english' &&
      examinations[1].type !== 'english'
    ) {
      throw new ApiError(
        {
          title: 'Choose appropriate exam combinations',
        },
        400,
      );
    }

    const amount = examinations.reduce(
      (acc, curr, i) => acc + (i === 0 ? +curr.primaryPrice : +curr.secondaryPrice),
      0,
    );

    const order = await DB.orders.create({
      amount,
      userId,
      examinations: examinationIds,
    });

    return order;
  }

  async addOrderOnRazorpay(orderId) {
    const order = await DB.orders.findOne({
      where: {
        id: orderId,
        isPaid: false,
        razorpayOrderId: {
          [Sequelize.Op.eq]: null,
        },
      },
    });

    if (!order) {
      throw new ApiError(
        {
          title: 'Order not found',
        },
        404,
      );
    }

    const resp = await this._axios.post('orders', {
      amount: order.amount,
      currency: 'INR',
    });
    order.razorpayOrderId = resp.data.id;
    await order.save();

    return order;
  }

  async refundPayment(paymentId, orderId) {
    const order = await DB.orders.findByPk(orderId);

    return this._axios.post(`payments/${paymentId}/refund`, {
      amount: order.amount,
    });
  }

  async captureOrder(paymentId, orderId, razorpaySignature) {
    const order = await DB.orders.findOne({
      where: {
        id: orderId,
        isPaid: false,
      },
    });

    if (!order) {
      throw new ApiError(
        {
          title: 'Order not found',
        },
        404,
      );
    }

    /*if (!verifyRazorpaySignature(order.razorpayOrderId, paymentId, razorpaySignature)) {
      throw new ApiError({
        title: 'Invalid Signature'
      }, 400)
    }*/

    const resp = await this._axios.post(`payments/${paymentId}/capture`, {
      amount: order.amount,
      currency: 'INR',
    });

    if (resp.status !== 200) {
      throw new ApiError(
        {
          title: 'Payment Failed',
        },
        500,
      );
    }

    order.isPaid = true;
    await order.save();

    return order;
  }
}

module.exports = OrdersService;
