const DB = require('models');

const enrollInExaminations = async (examinationsIds, userId) => {
  const result = await DB.sequelize.transaction(async t => {
    await Promise.all(
      examinationsIds.map(async examinationId => {
        const exam = await DB.examinations.findByPk(examinationId);

        return DB.examAttempts.create({
          start: exam.start,
          userId,
          examinationId
        })
      })
    )
  })

  return result
}

const checkAlreadyPaid = userId => DB.orders.findOne({
  where: {
    userId,
    isPaid: true
  }
})

module.exports = {
  enrollInExaminations,
  checkAlreadyPaid
}
