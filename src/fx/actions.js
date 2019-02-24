import * as types from './actionTypes';
import { api } from '~/utils';

export const getRates = () =>
  api({
    endpoint: '/latest',
    types: [types.GET_RATES, types.GET_RATES_SUCCESS, types.GET_RATES_FAILURE],
  });

export const setBaseCurrency = payload => ({
  type: types.SET_BASE_CURRENCY,
  payload,
});
