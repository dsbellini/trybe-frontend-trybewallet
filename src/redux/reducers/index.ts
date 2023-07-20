import { combineReducers } from 'redux';
import userRedux from './user';
import walletRedux from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// export default () => {}; // delete essa linha e configure os seus reducers

const rootReducer = combineReducers({
  user: userRedux,
  wallet: walletRedux,
});

export default rootReducer;
