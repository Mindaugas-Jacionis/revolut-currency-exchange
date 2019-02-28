import round from './round';

describe('round util works as expected', () => {
  it('returns NaN when invalid data provided', () => {
    expect(round()).toBe(NaN);
    expect(round({})).toBe(NaN);
    expect(round('random')).toBe(NaN);
    expect(round(true)).toBe(NaN);
    expect(round([])).toBe(NaN);
    expect(round(null)).toBe(NaN);
  });

  it('returns 5 when value is 5', () => {
    expect(round(5)).toBe(5);
  });

  it('returns 5.1 when value is 5.101', () => {
    expect(round(5.101)).toBe(5.1);
  });

  it('returns 5.05 when value is 2.52345', () => {
    expect(round(5.04692)).toBe(5.05);
  });
});
