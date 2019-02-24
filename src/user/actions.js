import * as types from './actionTypes';

export const addToWallet = payload => ({
  type: types.ADD_TO_WALLET,
  payload,
});

export const removeFromWallet = payload => ({
  type: types.REMOVE_FROM_WALLET,
  payload,
});
