const ApiError = require('base/error');
const BaseController = require('base/controllers/baseController');
const DB = require('models');
const { Op } = require('sequelize');

class ResultController extends BaseController {
  async _fetchUserFromPhoneNumber(phone_number, roll_number) {
    const user = await DB.users.findOne({
      where: {
        id: roll_number,
        phone: phone_number,
      },
    });

    if (!user) {
      throw new ApiError(
        {
          title: 'Incorrect mobile number or roll number',
        },
        400,
      );
    }

    return user;
  }

  async post() {
    const { roll_number, phone_number } = this.request.body;

    const user = await this._fetchUserFromPhoneNumber(phone_number, roll_number);
    const examAttempts = await DB.examAttempts.findAll({
      where: {
        userId: user.id,
        isSubmitted: true,
        result: {
          [Op.not]: null,
        },
      },
      include: DB.examinations,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      result: examAttempts.map((attempt) => ({
        percentage: attempt.result.percentage,
        rank: attempt.result.rank,
        examination: {
          title: attempt.examination.title,
        },
      })),
    };
  }
}

module.exports = {
  ResultController,
};
