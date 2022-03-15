import { render, screen,fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signin from '../screens/customer/Signin'

test('check for all the user login inputs', () => {
  render(<BrowserRouter><Signin /></BrowserRouter>);
  const email =     screen.getByTestId(/signin-email/i);
  const password =  screen.getByTestId(/signin-password/i);
  const loginBtn =  screen.getByTestId(/signin-btn/i);
  
  expect(email).toBeInTheDocument();
  expect(email.required).toBe(true);
  expect(email.type).toBe('email');
  expect(password).toBeInTheDocument();
  expect(password.required).toBe(true);
  expect(password.type).toBe("password");
  expect(loginBtn).toBeInTheDocument();
  
});

test("User must enter a valid email", () => {
  render(<BrowserRouter>
    <Signin />
  </BrowserRouter>);
  const email =     screen.getByTestId(/signin-email/i);
  const password =  screen.getByTestId(/signin-password/i);
  const loginBtn =  screen.getByTestId(/signin-btn/i);
  
  fireEvent.change(email, { target: { value: "guewgyfyg@yfwegwfy" } });
  fireEvent.change(password, { target: { value: "Password2020$" } });
  
  fireEvent.click(loginBtn);
  
  const errorMessage = screen.getByTestId(/alert-message/i)
  const error_message_btn =  screen.getByTestId(/error_message_btn/i);
  
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage.textContent).toBe("please enter a valid email");
  fireEvent.click(error_message_btn)
  expect(screen.queryByText("please enter a valid email")).toBeNull()

});  
