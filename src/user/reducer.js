import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const DEFAULT_WALLETS_STATE = {
  USD: 5000,
  GBP: 3000,
  EUR: 1700,
};

const DEFAULT_STATE = Immutable({
  wallets: DEFAULT_WALLETS_STATE,
});

const round = value => Math.round(value * 100) / 100;

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_WALLET: {
      const currentAmount = state.wallets[payload.currency] || 0;

      return Immutable.set(state, 'wallets', {
        ...state.wallets,
        [payload.currency]: round(currentAmount + payload.amount),
      });
    }

    case types.REMOVE_FROM_WALLET: {
      const currentAmount = state.wallets[payload.currency];

      console.log('Value', payload);

      return Immutable.set(state, 'wallets', {
        ...state.wallets,
        [payload.currency]: round(currentAmount - payload.amount),
      });
    }

    default:
      return state;
  }
};
