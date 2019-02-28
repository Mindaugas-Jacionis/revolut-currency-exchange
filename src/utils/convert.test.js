import convert from './convert';

describe('converter util works as expected', () => {
  it('returns 0 when invalid data provided', () => {
    expect(convert()).toBe(0);
    expect(convert({ rate: 1.2 })).toBe(0);
    expect(convert({ amount: 3.3 })).toBe(0);
    expect(convert({ amount: {}, rate: 12 })).toBe(0);
    expect(convert({ amount: [], rate: 12 })).toBe(0);
    expect(convert({ amount: null, rate: 12 })).toBe(0);
  });

  it('returns 5 when amount = 2 & rate = 2.5', () => {
    const result = convert({ amount: 2, rate: 2.5 });
    expect(result).toBe(5);
  });

  it('returns 5 when amount = 2 & rate = 2.5, as a strings', () => {
    const result = convert({ amount: '2', rate: '2.5' });
    expect(result).toBe(5);
  });

  it('returns 5.05 when amount = 2 & rate = 2.52345, result rounded with 2 digits after dot', () => {
    const result = convert({ amount: 2, rate: 2.52345 });
    expect(result).toBe(5.05);
  });
});
