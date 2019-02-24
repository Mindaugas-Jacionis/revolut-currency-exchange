import recalculateRates from './recalculateRates';
import * as constans from '~/constants';

describe('recalculateRates works as expected in production mode', () => {
  beforeEach(() => {
    constans.IS_PRODUCTION = true;
  });

  it('returns correct output with correct input', () => {
    const result = recalculateRates({
      base: 'EUR',
      newBase: 'GBP',
      rates: { GBP: 0.8835 },
    });
    expect(result).toEqual({ GBP: 1, EUR: 1.1319 });
  });

  it('returns unchanged input when base and newBase are the same', () => {
    const rates = { GBP: 0.8835, LTU: 0.00134 };
    const result = recalculateRates({
      base: 'GBP',
      newBase: 'GBP',
      rates,
    });
    expect(result).toEqual(rates);
  });

  it('returns rates when in production and invalid base suplied', () => {
    const data = {
      base: 12,
      newBase: 'PLN',
      rates: { GBP: 0.8835, LTU: 0.00134 },
    };
    const result = recalculateRates(data);

    expect(() => recalculateRates(data)).not.toThrow();
    expect(result).toEqual({ GBP: 0.8835, LTU: 0.00134 });
  });

  it('returns rates when production and invalid newBase suplied', () => {
    const data = { base: 'EUR', newBase: [], rates: {} };
    const result = recalculateRates(data);

    expect(() => recalculateRates(data)).not.toThrow();
    expect(result).toEqual({});
  });

  it('returns rates when production and invalid rates suplied', () => {
    const data = { base: 'EUR', newBase: 'EUR', rates: 'string' };
    const result = recalculateRates(data);

    expect(() => recalculateRates(data)).not.toThrow();
    expect(result).toEqual({});
  });

  it('returns rates when production and no base suplied', () => {
    const data = { newBase: 'EUR', rates: {} };
    const result = recalculateRates(data);

    expect(() => recalculateRates(data)).not.toThrow();
    expect(result).toEqual({});
  });

  it('returns rates when production and no newBase suplied', () => {
    const data = { base: 'EUR', rates: {} };
    const result = recalculateRates(data);

    expect(() => recalculateRates(data)).not.toThrow();
    expect(result).toEqual({});
  });

  it('returns rates when in production and no rates suplied', () => {
    const data = { base: 'EUR', newBase: 'PLN' };
    const result = recalculateRates(data);

    expect(() => recalculateRates(data)).not.toThrow();
    expect(result).toEqual({});
  });
});

describe('throws when not production and data does not validate', () => {
  beforeEach(() => {
    constans.IS_PRODUCTION = false;
  });

  it('throws when not production and invalid base suplied', () => {
    expect(() =>
      recalculateRates({ base: 12, newBase: 'PLN', rates: {} })
    ).toThrow('Bad input provided');
  });

  it('throws when not production and invalid newBase suplied', () => {
    expect(() =>
      recalculateRates({ base: 'EUR', newBase: [], rates: {} })
    ).toThrow('Bad input provided');
  });

  it('throws when not production and invalid rates suplied', () => {
    expect(() =>
      recalculateRates({ base: 'EUR', newBase: 'EUR', rates: 'string' })
    ).toThrow('Bad input provided');
  });

  it('throws when not production and no base suplied', () => {
    expect(() => recalculateRates({ newBase: 'GBP', rates: {} })).toThrow(
      'Bad input provided'
    );
  });

  it('throws when not production and no newBase suplied', () => {
    expect(() => recalculateRates({ base: 'EUR', rates: {} })).toThrow(
      'Bad input provided'
    );
  });

  it('throws when not production and no rates suplied', () => {
    expect(() => recalculateRates({ base: 'EUR', newBase: 'PLN' })).toThrow(
      'Bad input provided'
    );
  });
});
