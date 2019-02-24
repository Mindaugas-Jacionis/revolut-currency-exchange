import { RSAA } from 'redux-api-middleware';
import { DOMAIN_URL } from '~/constants';

const api = request => {
  const { endpoint, method = 'GET', types } = request;

  if (!Array.isArray(types)) {
    throw Error('types have to be an array of 3: REQUEST, SUCCESS & FAILURE');
  }

  if (!endpoint) {
    throw Error('No endpoint provided');
  }

  return {
    [RSAA]: {
      endpoint: `${DOMAIN_URL}${endpoint}`,
      method,
      types,
    },
  };
};

export default api;
