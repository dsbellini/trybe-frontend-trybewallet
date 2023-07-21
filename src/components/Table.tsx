import { useSelector } from 'react-redux';
import { ReduxState, TableType } from '../types';

function Table() {
  const expenses = useSelector((state: ReduxState) => state.wallet.expenses);

  // Função para formatar um valor para o formato pedido no readme -> 0.00
  const toFixedFunction = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: TableType) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{toFixedFunction(Number(expense.value))}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>
              {toFixedFunction(Number(expense.exchangeRates[expense.currency].ask))}

            </td>
            <td>
              {toFixedFunction(Number(expense.exchangeRates[expense.currency]
                .ask * Number(expense.value)))}
            </td>
            <td>Real</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
