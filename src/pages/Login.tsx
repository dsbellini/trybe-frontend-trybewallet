import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userRedux from '../redux/reducers/user';
import { putEmail } from '../redux/actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_STATE);
  // const [disabled, setDisabled] = useState(true);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleClick = () => {
    dispatch(putEmail({ ...form }));
    navigate('/carteira');
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 6;
  };

  const isFormValid = isEmailValid(form.email) && isPasswordValid(form.password);

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
      } }
    >
      <input
        type="email"
        data-testid="email-input"
        placeholder="Login"
        onChange={ handleChange }
        value={ form.email }
        name="email"
        required
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Senha"
        onChange={ handleChange }
        value={ form.password }
        name="password"
        required
      />
      <button
        onClick={ handleClick }
        disabled={ !isFormValid }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
