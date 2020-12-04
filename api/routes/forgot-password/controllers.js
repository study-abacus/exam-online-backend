const BaseController = require('base/controllers/baseController');
const DB = require('models');
const config = require('config');
const ApiError = require('base/error');

class ForgetPasswordController extends BaseController {
  async post() {
    const { email } = this.request.body;

    const user = await DB.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(
        {
          title: 'User does not exist',
        },
        400,
      );
    }

    const _resetPasswordService = this.app.getService('reset-password');
    const _emailService = this.app.getService('email');

    const token = await _resetPasswordService.createResetRequest(user);
    _emailService.sendViaTemplate(_emailService.templateMap.RESET_EMAIL, {
      subject: 'Study Abacus Password Reset',
      to: user.email,
      templateData: {
        link: config.SERVER.FRONTEND_URL + '/reset-password/' + token,
      },
    });

    this.response.status(204).send({});
  }

  async postVerifyToken() {
    const { token } = this.request.params;
    const _resetPasswordService = this.app.getService('reset-password');

    await _resetPasswordService.verifyResetToken(token);

    this.response.status(204).send({});
  }

  async postResetPassword() {
    const { token } = this.request.params;
    const { password, passwordRepeat } = this.request.body;

    if (password !== passwordRepeat) {
      throw new ApiError(
        {
          title: 'Password do not match',
        },
        400,
      );
    }

    const _resetPasswordService = this.app.getService('reset-password');

    const { userId } = await _resetPasswordService.verifyResetToken(token);
    await _resetPasswordService.updatePassword(userId, password);
    await _resetPasswordService.deleteResetRequest(token, userId);

    this.response.status(204).send({});
  }
}

module.exports = {
  ForgetPasswordController,
};
