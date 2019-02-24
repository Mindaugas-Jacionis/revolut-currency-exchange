import { IS_PRODUCTION } from '~/constants';

const round = number => Math.round(number * 10000) / 10000;

const recalculateRates = ({ base, newBase, rates }) => {
  const isMissingValues = !base || !newBase || !rates;
  const invalidRates = !(typeof rates === 'object') || Array.isArray(rates);
  const invalidBases = ![base, newBase].every(val => typeof val === 'string');
  const invalidInput = invalidBases || invalidRates;

  if ((isMissingValues || invalidInput) && IS_PRODUCTION) {
    return !invalidRates ? rates : {};
  }

  if ((isMissingValues || invalidInput) && !IS_PRODUCTION) {
    throw Error('Bad input provided');
  }

  if (base === newBase) {
    return rates;
  }

  const newBaseRate = rates[newBase || base];
  const newRates = Object.entries(rates).reduce(
    (result, [currency, rate]) => ({
      ...result,
      [currency]: round(rate / newBaseRate),
    }),
    {}
  );

  return {
    ...newRates,
    [newBase]: 1,
    [base]: round(1 / newBaseRate),
  };
};

export default recalculateRates;
