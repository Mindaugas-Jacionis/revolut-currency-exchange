import { RSAA } from 'redux-api-middleware';
import { DOMAIN_URL } from '~/constants';
import api from './api';

const types = ['request', 'success', 'failure'];
const endpoint = '/';
const expectedEndpoint = `${DOMAIN_URL}${endpoint}`;

describe('api util works as expected', () => {
  it('to throw error when types not provided', () => {
    expect(() => api({ endpoint })).toThrow(
      'types have to be an array of 3: REQUEST, SUCCESS & FAILURE'
    );
  });

  it('to throw error when no endpoint provided', () => {
    expect(() => api({ types })).toThrow('No endpoint provided');
  });

  it('returns expected object with method GET', () => {
    const expected = {
      [RSAA]: {
        endpoint: expectedEndpoint,
        method: 'GET',
        types,
      },
    };
    const result = api({ endpoint, types });
    expect(result).toEqual(expected);
  });

  it('returns expected object with method POST', () => {
    const expected = {
      [RSAA]: {
        endpoint: expectedEndpoint,
        method: 'POST',
        types,
      },
    };

    const result = api({ endpoint, types, method: 'POST' });
    expect(result).toEqual(expected);
  });

  it('to ignore other keys than endpoint, method and types', () => {
    const expected = {
      [RSAA]: {
        endpoint: expectedEndpoint,
        method: 'POST',
        types,
      },
    };

    const result = api({ endpoint, types, method: 'POST', random: 'random' });
    expect(result).toEqual(expected);
  });
});
