const convert = ({ amount = 0, rate = 0 } = {}) => {
  const result = amount * rate;

  if (Number.isNaN(result)) {
    return 0;
  }

  return result;
};

export default convert;
