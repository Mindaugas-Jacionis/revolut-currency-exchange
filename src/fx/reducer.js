import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import { recalculateRates } from './utils';

const DEFAULT_RATES_STATE = {
  fetching: false,
  error: null,
  data: {},
};

const DEFAULT_STATE = Immutable({
  sample: 0,
  rates: DEFAULT_RATES_STATE,
});

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case types.GET_RATES:
      return Immutable.set(state, 'rates', {
        ...DEFAULT_RATES_STATE,
        data: state.rates.data,
        fetching: true,
      });
    // TODO: use base and apply calculateRates
    case types.GET_RATES_SUCCESS: {
      const { data } = state.rates;
      const selectedBase = data.base || payload.base;
      const payloadRates = { ...payload.rates, [payload.base]: 1 };
      const rates = recalculateRates({
        base: payload.base,
        rates: payloadRates,
        newBase: selectedBase,
      });

      return Immutable.set(state, 'rates', {
        ...DEFAULT_RATES_STATE,
        data: {
          rates,
          base: selectedBase,
        },
      });
    }
    case types.GET_RATES_FAILURE:
      return Immutable.set(state, 'rates', {
        ...DEFAULT_RATES_STATE,
        data: state.rates.data,
        error: payload,
      });

    case types.SET_BASE_CURRENCY: {
      const { rates, base } = state.rates.data;
      const recalculatedRates = recalculateRates({
        base,
        rates,
        newBase: payload,
      });
      const newRatesData = { rates: recalculatedRates, base: payload };

      return Immutable.setIn(state, ['rates', 'data'], newRatesData);
    }
    default:
      return state;
  }
};
