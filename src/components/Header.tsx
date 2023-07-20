import { useSelector } from 'react-redux';
import { AllState, ExpensesType, ReduxState, WalletState } from '../types';

function Header() {
  const userData = useSelector((state: ReduxState) => state);

  const expenses = useSelector((state:AllState) => state.wallet.expenses);

  return (
    <header>
      <h4 data-testid="email-field">
        {userData.user.email}
      </h4>
      <h4 data-testid="total-field">
        Despesa total:
        {' '}
        {0}
      </h4>
      <h4 data-testid="header-currency-field">
        BRL
      </h4>

    </header>
  );
}

export default Header;
