import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllState, Dispatch } from '../types';
import { fetchCurrencies } from '../redux/actions';

function WalletForm() {
  const walletInfo = useSelector((state: AllState) => state);

  const dispatch: Dispatch = useDispatch();

  // Faz a chamada à API assim que o componente for montado
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const { currencies } = walletInfo.wallet;
  console.log(currencies);

  if (!currencies) {
    return <h2>Carregando...</h2>;
  }
  return (
    <form action="">
      <input
        type="text"
        data-testid="value-input"
        placeholder="Valor da despesa"
      />
      <input
        type="text"
        data-testid="description-input"
        placeholder="Descrição da despesa"
      />
      <label htmlFor="currency-input">Moeda:</label>
      <select id="currency-input" data-testid="currency-input">
        {currencies.map((currency) => (
          <option key={ currency } value={ currency }>
            {currency}
          </option>
        ))}
      </select>

      <select id="method-input" data-testid="method-input">
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <input
        type="text"
        data-testid="description-input"
        placeholder="Descrição da despesa"
      />

      <label htmlFor="tag-input">Categoria:</label>
      <select id="tag-input" data-testid="tag-input">
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    </form>
  );
}

export default WalletForm;
