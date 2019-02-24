const convert = ({ amount = 0, rate = 0 } = {}) => {
  const result = Math.round(amount * rate) / 100;

  if (Number.isNaN(result)) {
    return 0;
  }

  return result;
};

export default convert;
