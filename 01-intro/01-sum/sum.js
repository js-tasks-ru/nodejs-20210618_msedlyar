function sum(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError();
  }

  return a + b;
}

function isNumber(value) {
  return typeof value === 'number';
}

module.exports = sum;
