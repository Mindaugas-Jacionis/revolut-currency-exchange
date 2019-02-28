export default value => {
  if (typeof value !== 'number') {
    return NaN;
  }

  return Math.round(value * 100) / 100;
};
