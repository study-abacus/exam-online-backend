const Sequelize = require('sequelize');
const DB = require('models');
const ApiError = require('base/error');
const crypto = require('crypto');
const config = require('config');
const moment = require('moment');

const isExaminationIdsCorrect = async (examinationIds) => {
  const count = await DB.examinations.count({
    where: {
      id: {
        [Sequelize.Op.in]: examinationIds,
      },
      registrationEnd: {
        [Sequelize.Op.gt]: moment().toISOString(),
      },
    },
  });

  if (count !== examinationIds.length) {
    throw new ApiError({
      title: 'Incorrect Examination Selected',
    });
  }

  return true;
};

const verifyRazorpaySignature = (orderId, paymentId, razorpaySignature) => {
  const hmac = crypto.createHmac('sha256', config.RAZORPAY.SECRET);
  hmac.update(`${orderId}|${paymentId}`);
  const hash = hmac.digest('hex');

  return hash === razorpaySignature;
};

module.exports = {
  isExaminationIdsCorrect,
  verifyRazorpaySignature,
};
