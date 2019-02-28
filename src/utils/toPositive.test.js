import toPositive from './toPositive';

describe('toNegative util works as expected', () => {
  it('returns NaN when invalid data provided', () => {
    expect(toPositive()).toBe(NaN);
    expect(toPositive({})).toBe(NaN);
    expect(toPositive('random')).toBe(NaN);
    expect(toPositive(true)).toBe(NaN);
    expect(toPositive([])).toBe(NaN);
    expect(toPositive(null)).toBe(NaN);
  });

  it('returns -5 when value is 5', () => {
    expect(toPositive(-5)).toBe(5);
  });

  it('returns -5.1011 when value is 5.1011', () => {
    expect(toPositive(5.1011)).toBe(5.1011);
  });

  it('returns 5 when value is 5', () => {
    expect(toPositive(5)).toBe(5);
  });
});
