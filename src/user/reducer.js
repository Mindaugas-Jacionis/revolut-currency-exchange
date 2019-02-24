import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const DEFAULT_WALLETS_STATE = {
  usd: 5000,
  gbp: 3000,
  eur: 1700,
};

const DEFAULT_STATE = Immutable({
  wallets: DEFAULT_WALLETS_STATE,
});

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_WALLET: {
      const currentAmount = state.wallets[payload.currency] || 0;

      return Immutable.set(state, 'wallets', {
        ...state.wallets,
        [payload.currency]: currentAmount + payload.amount,
      });
    }
    // case types.ADD_TO_WALLET:
    //   return state;

    case types.REMOVE_FROM_WALLET: {
      const currentAmount = state.wallets[payload.currency];

      return Immutable.set(state, 'wallets', {
        ...state.wallets,
        [payload.currency]: currentAmount - payload.amount,
      });
    }
    // case types.REMOVE_FROM_WALLET:
    //   return state;

    default:
      return state;
  }
};
