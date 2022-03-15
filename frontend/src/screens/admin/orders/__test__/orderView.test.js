import { render, screen } from '@testing-library/react';
import { currencyFormatter, dateFormatter } from '../../../../helpers/formatter';
import OrderView from '../components/OrderView';
import { orders } from './orders.data';

it('should display order details at screen', async() => {
  await render(<OrderView order={orders[0]} />);
  const orderNumber = screen.queryByText(`${orders[0].order_number}`);
  const user = screen.queryByText(orders[0].user);
  const price = screen.queryAllByText(currencyFormatter(orders[0].total_price));
  const date = screen.queryByText(dateFormatter(orders[0].created_at));
  const status = screen.queryByText(orders[0].status);
  const city = screen.queryByText(orders[0].shipping_address.city);
  const street = screen.queryByText(orders[0].shipping_address.street);
  const suite = screen.queryByText(orders[0].shipping_address.suite);
  const zipcode = screen.queryByText(orders[0].shipping_address.zipcode);

  expect(orderNumber).toBeVisible();
  expect(user).toBeVisible();
  expect(price[0]).toBeVisible();
  expect(status).toBeVisible();
  expect(city).toBeVisible();
  expect(suite).toBeVisible();
  expect(zipcode).toBeVisible();
  expect(street).toBeVisible();
  expect(date).toBeVisible();
});
