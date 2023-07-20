import { useSelector } from 'react-redux';
import { ExpensesType, ReduxState } from '../types';

function Header() {
  const userData = useSelector((state: ReduxState) => state);

  const expenses = useSelector((state: ReduxState) => state.wallet.expenses);

  const totalExpense = expenses.reduce((acc: number, curr: ExpensesType) => acc
  + Number(curr.value)
  * Number(curr.exchangeRates[curr.currency].ask), 0);

  return (
    <header>
      <h4 data-testid="email-field">
        {userData.user.email}
      </h4>
      <h4 data-testid="total-field">
        {totalExpense.toFixed(2)}
      </h4>
      <h4 data-testid="header-currency-field">
        BRL
      </h4>

    </header>
  );
}

export default Header;
