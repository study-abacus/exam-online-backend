const moment = require('moment');

function randomGenerator() {
  const date = new moment();
  const max = 99999;
  const min = 11111;

  let a = date.millisecond();

  return function mulberry32() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    let res = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    res = Math.floor(res * (max - min + 1)) + min;
    return res;
  };
}

module.exports = {
  random: randomGenerator(),
};
