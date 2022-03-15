import { render, screen } from '@testing-library/react';
import PaymentSuccess from '../screens/customer/PaymentSuccess'


test('check the content of payment success screen', () => {
  render(<PaymentSuccess />);
  const image =     screen.getByTestId(/payment-image/i);
  const message =  screen.getByTestId(/payment-message/i);
  
  expect(image).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(message.textContent).toBe("Your Payment has been submitted successfully");
  
});