import { combineReducers } from 'redux';
import fx from '~/fx';
import user from '~/user';

export default combineReducers({
  [fx.constants.NAME]: fx.reducer,
  [user.constants.NAME]: user.reducer,
});
