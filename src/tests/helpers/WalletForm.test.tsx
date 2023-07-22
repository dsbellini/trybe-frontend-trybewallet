import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';
import mockFetch from './mocks/mockFetch';

const userMail = 'email@email.com';
const userPassword = '1234567';

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

const CURRENCIES = [
  'USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR',
  'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE',
];

const REDUX_EXPENSE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [
      {
        id: 0,
        value: '1500',
        currency: 'CAD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Gasto de teste',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '1501',
        currency: 'CAD',
        method: 'Cartão de débito',
        tag: 'Lazer',
        description: 'Gasto',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('Página /carteira', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetch as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test.skip('1 - Verifica se os inputs de valor e descrição estão vazios', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByPlaceholderText('Valor da despesa');
    const descriptionInput = screen.getByPlaceholderText('Descrição da despesa');

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });

  test.skip('2 - Verifica se, após o login, o estado inicial consta atualizado', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    // Simula login
    await loginSimulator();
    expect(store.getState()).toMatchObject(LOGIN_STATE);
  });

  test('3 - Verifica se, após adicionar uma despesa, consta atualizada no estado', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    vi.mock('./mocks/mockFetch');
    (mockFetch as any).mockResolvedValue({
      json: async () => ({ currencies: CURRENCIES }),
    });

    expect(global.fetch).toHaveBeenCalled();

    const valueInput = screen.getByPlaceholderText('Valor da despesa');
    const descriptionInput = screen.getByPlaceholderText('Descrição da despesa');
    const currency = screen.getByLabelText('Moeda:');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const expenseBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
    await waitFor(() => {
      expect(currency).toHaveValue('USD');
    }, { timeout: 5000 });
    expect(currency).toHaveValue('USD');
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
    await userEvent.click(expenseBtn);
    expect(store.getState()).toMatchObject(REDUX_EXPENSE);
  });
});
