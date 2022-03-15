import { render, screen } from '@testing-library/react';
import { currencyFormatter, dateFormatter } from '../../../../helpers/formatter';
import Table from '../components/OrdersTable';
import { orders } from './orders.data';

it('should display at least one document in table row', async () => {
  await render(<Table headers={['ID', 'User', 'Total', 'Date', '']} data={orders} />);
  const orderNumber = screen.queryByText(`${orders[0].order_number}`);
  const user = screen.queryByText(orders[0].user);
  const price = screen.queryAllByText(currencyFormatter(orders[0].total_price));
  const date = screen.queryByText(dateFormatter(orders[0].created_at));
  expect(orderNumber).toBeVisible();
  expect(user).toBeVisible();
  expect(price[0]).toBeVisible();
  expect(date).toBeVisible();
});
