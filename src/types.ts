import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ReduxState = {
  user: {
    email: string, // string que armazena o e-mail da pessoa usuária
  },
  wallet: {
    currencies: string[], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
  }
};

export type UserState = {
  email: string,
};

export type WalletState = {
  currencies: string[], // array de string
  expenses: ExpensesType[], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: boolean, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada

};

export type CurrencyState = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type AllState = {
  user: UserState,
  wallet: WalletState,
};

export type ExpensesType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: object | any,
};

export type Dispatch = ThunkDispatch<ReduxState, void, AnyAction>;
