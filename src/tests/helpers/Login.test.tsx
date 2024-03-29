import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Página de Login', () => {
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

  test('1 - Verifica se existe o campo de Login, Senha e o botão Entrar desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(screen.getByPlaceholderText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });
  test('2 - Verifica o redirecionamento do botão Entrar e se ele está desativado na renderização', async () => {
    renderWithRouterAndRedux(<App />);
    await loginSimulator();
    expect(screen.getByRole('heading', { name: userMail })).toBeInTheDocument();
  });
});
