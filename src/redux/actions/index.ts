import { CurrencyState, Dispatch, ExpensesType, UserState } from '../../types';

// ACTION TYPES
export const PUT_EMAIL = 'PUT_EMAIL';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

// ACTION CREATORS

export const putEmail = (email: UserState) => ({
  type: PUT_EMAIL,
  payload: email,
});

export const putExpenses = (expenses: ExpensesType) => ({
  type: 'PUT_EXPENSE',
  payload: expenses,
});

function requestStarted() {
  return { type: REQUEST_STARTED };
}

function requestSuccessful(currencies: string[]) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

function requestFailed(error: string) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

function addExpense(expense: ExpensesType) {
  return {
    type: 'PUT_EXPENSE',
    payload: expense,
  };
}

// Função para fazer a requisição à API e retornar os dados das moedas
export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();

      const currencies = Object.keys(data)
        .filter((currency) => currency !== 'USDT');

      dispatch(requestSuccessful(currencies));
    } catch (error) {
      dispatch(requestFailed('Erro de fetch'));
    }
  };
}

export function fetchCurrencyRate(expense: ExpensesType) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');

      const data = await response.json();
      delete data.USDT;

      const exchangeRates = {
        ...expense,
        exchangeRates: data,
      };

      dispatch(addExpense(exchangeRates));
    } catch (error) {
      console.error('Erro de requisição(fetch):');
    }
  };
}
