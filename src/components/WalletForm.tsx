import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllState, Dispatch, ExpensesType } from '../types';
import { fetchCurrencyRate, fetchCurrencies } from '../redux/actions';

const INITIAL_STATE = {
  id: 0,
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: '',
  description: '',
  exchangeRates: {},
};

function WalletForm() {
  const walletInfo = useSelector((state: AllState) => state);
  const [expense, setExpense] = useState(INITIAL_STATE);
  const [selectedTag, setSelectedTag] = useState('');
  const [expensesList, setExpensesList] = useState<ExpensesType[]>([]);

  const dispatch: Dispatch = useDispatch();

  // Faz a chamada à API assim que o componente for montado
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const { currencies } = walletInfo.wallet;

  if (!currencies) {
    return <h2>Carregando...</h2>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setExpense(() => ({ ...expense, [name]: value }));
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const handleClick = () => {
    const newExpense: ExpensesType = {
      ...expense,
      tag: selectedTag,
      id: expensesList.length, // id único para a despesa
    };

    setExpensesList((prevList) => [...prevList, newExpense]);
    dispatch(fetchCurrencyRate(newExpense));

    setExpense(INITIAL_STATE);
    setSelectedTag('');
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
      } }
    >
      <input
        type="text"
        data-testid="value-input"
        placeholder="Valor da despesa"
        onChange={ handleChange }
        name="value"
        value={ expense.value }
      />
      <input
        type="text"
        data-testid="description-input"
        placeholder="Descrição da despesa"
        onChange={ handleChange }
        name="description"
        value={ expense.description }
      />
      <label htmlFor="currency-input">Moeda:</label>
      <select
        id="currency-input"
        data-testid="currency-input"
        onChange={ handleChange }
        name="currency"
        value={ expense.currency }
      >
        {currencies.map((currency) => (
          <option key={ currency } value={ currency }>
            {currency}
          </option>
        ))}
      </select>

      <label htmlFor="method-input">Método:</label>
      <select
        id="method-input"
        data-testid="method-input"
        onChange={ handleChange }
        name="method"
        value={ expense.method }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <label htmlFor="tag-input">Categoria:</label>
      <select
        id="tag-input"
        data-testid="tag-input"
        onChange={ handleTagChange }
        value={ selectedTag }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>

      <button onClick={ handleClick }>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
