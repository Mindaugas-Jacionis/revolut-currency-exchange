import round from './round';

const convert = ({ amount = 0, rate = 0, reverse = false } = {}) => {
  const convertedValue = reverse ? amount / rate : amount * rate;
  const result = round(convertedValue);

  if (Number.isNaN(result)) {
    return 0;
  }

  return result;
};

export default convert;
