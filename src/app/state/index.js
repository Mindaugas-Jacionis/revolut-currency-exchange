import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const apliedMiddlewares = applyMiddleware(apiMiddleware);
const middlewares =
  process.env.NODE_ENV === 'production'
    ? apliedMiddlewares
    : composeWithDevTools(apliedMiddlewares);

const store = createStore(reducers, middlewares);

export default store;
