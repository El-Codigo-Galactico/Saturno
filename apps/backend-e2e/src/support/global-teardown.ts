/* eslint-disable */

module.exports = async function () {
  console.log(globalThis.__TEARDOWN_MESSAGE__ || 'Tearing down...');

  if (globalThis.__SERVER__) {
    globalThis.__SERVER__.kill();
    console.log('Backend server stopped.');
  }
};
