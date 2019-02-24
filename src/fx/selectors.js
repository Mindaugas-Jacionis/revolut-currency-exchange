import idx from 'idx';
import { NAME } from './constants';

export const getSample = state => state[NAME].sample;

export const isRatesFetching = state => state[NAME].rates.fetching;
export const getRatesError = state => state[NAME].rates.error;
export const getRatesData = state => state[NAME].rates.data;
export const getRates = state => idx(getRatesData(state), r => r.rates) || {};
export const getRatesBase = state => idx(getRatesData(state), r => r.base);
export const getCurrencyList = state => Object.keys(getRates(state) || []);
