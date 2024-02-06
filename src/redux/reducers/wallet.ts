// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { AnyAction } from 'redux';
import { PUT_EXPENSE, REQUEST_SUCCESSFUL } from '../actions';
import { ExpensesType } from '../../types';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
};

export default function walletRedux(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case REQUEST_SUCCESSFUL:
      return {
        ...state,
        currencies: action.payload,
      };
    case PUT_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'DELETE_EXPENSE':
      action.payload as string;
      return ({
        ...state,
        expenses: state.expenses.filter((expense: ExpensesType) => expense
          .id !== action.payload),
      });
    default:
      return state;
  }
}
