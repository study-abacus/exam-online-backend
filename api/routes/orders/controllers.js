const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');
const { enrollInExaminations } = require('./utils');

class OrdersDetailController extends BaseDetailController {
  model = DB.orders

  generateWhereClause() {
    const user = this.request.user
    return {
      userId: user.id
    }
  }

  async post() {
    const _ordersService = this.app.getService('orders');
    const { examinationIds } = this.request.body;

    const order = await _ordersService.createOrder(examinationIds, this.request.user.id);

    return this.serialize(order);
  }

  async postOrderPaymentStart() {
    const _ordersService = this.app.getService('orders');
    let order = await this.getObject();

    await _ordersService.addOrderOnRazorpay(order.id);

    // fetch updated object
    order = await this.getObject();

    return this.serialize(order);
  }

  async postPaymentCapture() {
    const _ordersService = this.app.getService('orders')
    let order = await this.getObject();
    const {
      razorpay_payment_id
    } = this.request.body

    await _ordersService.captureOrder(
      razorpay_payment_id, 
      order.id
    )

    try {
      // fetch updated object
      order = await this.getObject();
  
      enrollInExaminations(order.examinations, this.request.user.id)

      return this.serialize(order);
    } catch (err) {
      await _ordersService.refundPayment(razorpay_payment_id, order.id)
      throw err
    }
  }
}

module.exports = {
  OrdersDetailController
}
