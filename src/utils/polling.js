const start = (fn, { initial = false, interval = 10000 } = {}) => {
  if (!fn || typeof fn !== 'function') {
    return null;
  }

  if (initial) {
    fn();
  }

  const unsubscribe = setInterval(() => fn(), interval);
  return unsubscribe;
};

const stop = id => {
  clearInterval(id);
};

export default { start, stop };
