import convert from './convert';

describe('converter util works as expected', () => {
  it('returns 0 when no data provided', () => {
    const result = convert();
    expect(result).toBe(0);
  });

  it('returns 0 when no amount provided', () => {
    const result = convert({ rate: 1.2 });
    expect(result).toBe(0);
  });

  it('returns 0 when no rate provided', () => {
    const result = convert({ amount: 3.3 });
    expect(result).toBe(0);
  });

  it('returns 0 when invalid value {} suplied', () => {
    const result = convert({ amount: {}, rate: 12 });
    expect(result).toBe(0);
  });

  it('returns 0 when invalid value [] suplied', () => {
    const result = convert({ amount: [], rate: 12 });
    expect(result).toBe(0);
  });

  it('returns 0 when invalid value null suplied', () => {
    const result = convert({ amount: null, rate: 12 });
    expect(result).toBe(0);
  });

  it('returns 5 when amount = 2 & rate = 2.5', () => {
    const result = convert({ amount: 2, rate: 2.5 });
    expect(result).toBe(5);
  });

  it('returns 5 when amount = 2 & rate = 2.5, as a strings', () => {
    const result = convert({ amount: 2, rate: 2.5 });
    expect(result).toBe(5);
  });
});
