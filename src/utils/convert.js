const convert = ({ amount = 0, rate = 0, reverse = false } = {}) => {
  const convertedValue = reverse ? amount / rate : amount * rate;
  const result = Math.round(convertedValue * 100) / 100;

  if (Number.isNaN(result)) {
    return 0;
  }

  return result;
};

export default convert;
