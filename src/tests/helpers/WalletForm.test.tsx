import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';
import { ReduxState } from '../../types';

const userMail = 'email@email.com';

const REDUX_STATE_LOGIN = {
  user: {
    email: userMail,
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const CURRENCIES = [
  'USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR',
  'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE',
];

const REDUX_EXPENSE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: CURRENCIES,
    expenses: [
      {
        id: 0,
        value: '1500',
        currency: 'CAD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Gasto de teste',
        exchangeRates: { ...mockData },
      },
      {
        id: 1,
        value: '1501',
        currency: 'CAD',
        method: 'Cartão de débito',
        tag: 'Lazer',
        description: 'Gasto',
        exchangeRates: { ...mockData },
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('Página /carteira', () => {
  test('1 - Verifica se os inputs de valor e descrição estão vazios', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByPlaceholderText('Valor da despesa');
    const descriptionInput = screen.getByPlaceholderText('Descrição da despesa');

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });
  test('2 - Verifica se, após o login, o estado inicial consta atualizado', async () => {
    // Simula login
    const { store } = renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    const loginInput = screen.getByPlaceholderText('Login');
    const passwordInput = screen.getByPlaceholderText('Senha');

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
    await userEvent.type(loginInput, userMail);
    await userEvent.type(passwordInput, '1234567');
    expect(loginBtn).not.toBeDisabled();
    await userEvent.click(loginBtn);
    expect(store.getState()).toMatchObject(REDUX_STATE_LOGIN);
  });
  test('3 - Verifica se, após adicionar uma despesa, consta atualizada no estado', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    // ToDo: simular o fetch da API onde adquiri as moedas

    const valueInput = screen.getByPlaceholderText('Valor da despesa');
    const descriptionInput = screen.getByPlaceholderText('Descrição da despesa');
    const currency = screen.getByLabelText('Moeda:');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const expenseBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
    expect(currency).toHaveTextContent('');
    expect(method).toHaveTextContent('Dinheiro');
    expect(tag).toHaveTextContent('Alimentação');
    expect(expenseBtn).toBeInTheDocument();

    await userEvent.type(valueInput, '1500');
    await userEvent.type(descriptionInput, 'Gasto de teste');
    await userEvent.selectOptions(currency, 'CAD');
    await userEvent.selectOptions(method, 'Cartão de crédito');
    await userEvent.selectOptions(tag, 'Lazer');
    await userEvent.click(expenseBtn);
    await userEvent.type(valueInput, '1501');
    await userEvent.type(descriptionInput, 'Gasto');
    await userEvent.selectOptions(currency, 'CAD');
    await userEvent.selectOptions(method, 'Cartão de débito');
    await userEvent.selectOptions(tag, 'Lazer');
    expect(store.getState()).toMatchObject(REDUX_EXPENSE);
  });
});
