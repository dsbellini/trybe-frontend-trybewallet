import { Dispatch, ExpensesType, UserState } from '../../types';

// ACTION TYPES
export const PUT_EMAIL = 'PUT_EMAIL';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const PUT_EXPENSE = 'PUT_EXPENSE';

// ACTION CREATORS

export const putEmail = (email: UserState) => ({
  type: PUT_EMAIL,
  payload: email,
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
    type: PUT_EXPENSE,
    payload: expense,
  };
}

// Ação para excluir uma despesa pelo ID
export const removeExpense = (expenseId: number) => {
  return {
    type: 'DELETE_EXPENSE',
    payload: expenseId,
  };
};

export const removeExpenseError = () => ({
  type: 'REMOVE_EXPENSE_ERROR',
});

export const deleteExpense = (expenseId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(removeExpense(expenseId));
    } catch (error) {
      dispatch(removeExpenseError());
    }
  };
};

// Função para fazer a requisição à API e retornar os dados das moedas
export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;

      const currencies = Object.keys(data)
        .map((currency) => currency);

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
