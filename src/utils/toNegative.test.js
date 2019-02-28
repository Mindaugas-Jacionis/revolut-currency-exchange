import toNegative from './toNegative';

describe('toNegative util works as expected', () => {
  it('returns NaN when invalid data provided', () => {
    expect(toNegative()).toBe(NaN);
    expect(toNegative({})).toBe(NaN);
    expect(toNegative('random')).toBe(NaN);
    expect(toNegative(true)).toBe(NaN);
    expect(toNegative([])).toBe(NaN);
    expect(toNegative(null)).toBe(NaN);
  });

  it('returns -5 when value is 5', () => {
    expect(toNegative(5)).toBe(-5);
  });

  it('returns 5.1011 when value is -5.1011', () => {
    expect(toNegative(5.1011)).toBe(-5.1011);
  });

  it('returns -5 when value is -5', () => {
    expect(toNegative(-5)).toBe(-5);
  });
});
