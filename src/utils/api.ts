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
