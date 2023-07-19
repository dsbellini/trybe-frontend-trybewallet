// Esse reducer será responsável por tratar as informações da pessoa usuária

import { AnyAction } from 'redux';
import { PUT_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function userRedux(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case PUT_EMAIL: {
      return { ...state, ...action.payload };
    }
    default: return state;
  }
}
