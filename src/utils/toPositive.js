export default value => {
  if (typeof value !== 'number') {
    return NaN;
  }

  return value >= 0 ? value : value * -1;
};
