import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';
import Wallet from '../../pages/Wallet';
import { ReduxState } from '../../types';

const userMail = 'email@email.com';
const userPassword = '1234567';

const REDUX_STATE: ReduxState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const loginSimulator = async () => {
  const loginBtn = screen.getByRole('button', { name: 'Entrar' });
  const loginInput = screen.getByPlaceholderText('Login');
  const passwordInput = screen.getByPlaceholderText('Senha');

  expect(loginBtn).toBeInTheDocument();
  expect(loginBtn).toBeDisabled();
  await userEvent.type(loginInput, userMail);
  await userEvent.type(passwordInput, userPassword);
  expect(loginBtn).not.toBeDisabled();
  await userEvent.click(loginBtn);
};

const LOGIN_STATE = {
  user: {
    email: userMail,
    password: userPassword,
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const REDUX_EXPENSE = {
  id: 0,
  value: '10000',
  description: 'Kinder Ovo',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Alimentação',
  exchangeRates: mockData,
};

describe('Página /carteira', () => {
  test('1 - Verifica se os inputs de valor e descrição estão vazios', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByPlaceholderText('Valor da despesa');
    const descriptionInput = screen.getByPlaceholderText('Descrição da despesa');

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });

  test('2 - Verifica se, após o login, o estado inicial consta atualizado', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    // Simula login
    await loginSimulator();
    expect(store.getState()).toMatchObject(LOGIN_STATE);
  });

  test('3 - Verifica se, após adicionar uma despesa, consta atualizada no estado', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });

    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: REDUX_STATE });

    expect(global.fetch).toHaveBeenCalled();

    const valueInput = screen.getByPlaceholderText('Valor da despesa');
    const descriptionInput = screen.getByPlaceholderText('Descrição da despesa');
    const currency = screen.getByLabelText('Moeda:');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const expenseBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    await userEvent.type(valueInput, '10000');
    await userEvent.type(descriptionInput, 'Kinder Ovo');
    await userEvent.selectOptions(currency, 'USD');
    await userEvent.selectOptions(method, 'Cartão de crédito');
    await userEvent.selectOptions(tag, 'Alimentação');
    await userEvent.click(expenseBtn);
    expect(store.getState().wallet.expenses[0]).toMatchObject(REDUX_EXPENSE);
  });
});
