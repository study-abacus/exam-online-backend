const DB = require('models');
const Bluebird = require('bluebird');

class JudgeService {
  constructor(app) {
    this._app = app;
  }

  async generateResultForExamAttempt(examAttemptId, answerMap) {
    const examAttempt = await DB.examAttempts.findByPk(examAttemptId, {
      include: {
        model: DB.examinations,
        include: {
          model: DB.questions,
        },
      },
    });
    const examination = examAttempt.examination;
    const questions = examination.questions;

    const result = {
      score: 0,
      questions: {},
    };

    for (let question of questions) {
      const questionAttempt = await DB.questionAttempts.findOne({
        where: {
          questionId: question.id,
          examAttemptId: examAttempt.id,
        },
      });
      const actualAnswer = answerMap[question.id];

      if (questionAttempt && actualAnswer) {
        result.questions[question.id] = {
          answer: questionAttempt.answer,
          correctAnswer: actualAnswer,
          score:
            questionAttempt.answer.toLowerCase().trim() === actualAnswer.toLowerCase().trim()
              ? 10
              : 0,
        };
      }
    }

    result.score = Object.values(result.questions).reduce((acc, curr) => acc + curr.score, 0);
    console.log(result);
    examAttempt.result = result;
    await examAttempt.save();
  }
}

module.exports = JudgeService;
