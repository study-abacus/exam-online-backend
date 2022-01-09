const ApiError = require('base/error');

const limitedSmsToPhoneNumber = (app) => async (request) => {
  const otpLimitingService = app.getService('limit-otp');

  const phone = request.body.phone;
  if (await otpLimitingService.canSendOtp(phone)) {
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
