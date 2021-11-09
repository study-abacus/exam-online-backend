const LimitOtpService = require('./services/limit-otp-service');
const ApiError = require('base/error');

const limitedSmsToPhoneNumber = async (request) => {
  const phone = request.body.phone;
  if (await LimitOtpService.canSendOtp(phone)) {
    return;
  }

  throw new ApiError(
    {
      title: "Can't send more than 3 OTPs in a day",
    },
    402,
  );
};

module.exports = {
  limitedSmsToPhoneNumber,
};
