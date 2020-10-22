const toBase64 = (string) => Buffer.from(string).toString('base64');
const fromBase64 = (base64) => Buffer.from(base64, 'base64').toString();

module.exports = {
  toBase64,
  fromBase64,
};
