import { Dispatch, UserState } from '../../types';

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
