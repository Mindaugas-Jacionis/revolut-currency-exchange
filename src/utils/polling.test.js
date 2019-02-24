import polling from './polling';

jest.useFakeTimers();

const badCallbacks = ['sting', null, [], {}, 123];
const badIntervalIds = ['sting', null, [], {}, () => {}];
const getType = value => {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  return typeof value;
};

describe('polling util works as expected', () => {
  beforeEach(() => {
    setInterval.mockClear();
    clearInterval.mockClear();
    jest.clearAllTimers();
  });

  it('polling.start does not start polling when no callback', () => {
    const unsubscribe = polling.start();

    expect(setInterval).toHaveBeenCalledTimes(0);
    expect(unsubscribe).toBe(null);
  });

  badCallbacks.forEach(cb => {
    const type = getType(cb);

    it(`polling.start does not start polling when ${type} provided as callback`, () => {
      const unsubscribe = polling.start(cb);

      expect(setInterval).toHaveBeenCalledTimes(0);
      expect(unsubscribe).toBe(null);
    });
  });

  badIntervalIds.forEach(input => {
    const type = getType(input);

    it(`polling.stop calls clearInterval as expected with ${type}`, () => {
      polling.stop(input);
      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenLastCalledWith(input);
    });
  });

  it('polling.stop calls clearInterval as expected when id is undefined', () => {
    polling.stop();
    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenLastCalledWith(undefined);
  });

  it('polling.start calls setInterval correctly and interval works until stoped as expected', () => {
    const callback = jest.fn();
    const unsubscribe = polling.start(callback);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(30000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);

    polling.stop(unsubscribe);
    jest.advanceTimersByTime(30000);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('works correctly with custom interval timeframe', () => {
    const callback = jest.fn();
    polling.start(callback, { interval: 3000 });

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(30000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(10);
  });

  it('triggers initial callback', () => {
    const callback = jest.fn();
    polling.start(callback, { initial: true });

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(30000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('triggers initial callback with custom interval', () => {
    const callback = jest.fn();
    polling.start(callback, { initial: true, interval: 3000 });

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(30000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(11);
  });
});
