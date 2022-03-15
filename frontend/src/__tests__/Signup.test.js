import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../screens/customer/Signup'
import userEvent from '@testing-library/user-event';


test('check for all the user registarion inputs', () => {
  render(<BrowserRouter>
            <Signup />
        </BrowserRouter>);
  const firstName = screen.getByTestId(/signup_first_name/i);
  const lastName =  screen.getByTestId(/signup_last_name/i);
  const email =     screen.getByTestId(/signup_email/i);
  const password =  screen.getByTestId(/signup_password/i);
  const confirm_password =  screen.getByTestId(/confirm_password/i);
  const registerBtn = screen.getByTestId(/regitser_btn/i);
 
  expect(firstName).toBeInTheDocument();
  expect(firstName.required).toBe(true);
  expect(lastName).toBeInTheDocument();
  expect(lastName.required).toBe(true);
  expect(email).toBeInTheDocument();
  expect(email.required).toBe(true);
  expect(email.type).toBe('email');
  expect(password).toBeInTheDocument();
  expect(password.required).toBe(true);
  expect(password.type).toBe("password");
  expect(confirm_password).toBeInTheDocument();
  expect(confirm_password.required).toBe(true);
  expect(confirm_password.type).toBe("password");
  expect(registerBtn).toBeInTheDocument();
  
});

test("Invalid emails is not allowed when submitting", () => {
  render(<BrowserRouter>
    <Signup />
</BrowserRouter>);
  const firstName = screen.getByTestId(/signup_first_name/i);
  const lastName =  screen.getByTestId(/signup_last_name/i);
  const email =     screen.getByTestId(/signup_email/i);
  const password =  screen.getByTestId(/signup_password/i);
  const confirm_password =  screen.getByTestId(/confirm_password/i);
  const registerBtn = screen.getByTestId(/regitser_btn/i);
 
  fireEvent.change(firstName, { target: { value: "Mohamed" } });
  fireEvent.change(lastName, { target:  { value: "Farag" } });
  fireEvent.change(email, { target: { value: "guewgyfyg yfwegwfy" } });
  fireEvent.change(password, { target: { value: "Password2020$" } });
  fireEvent.change(confirm_password, { target: { value: "Password2020$" } });
  
  fireEvent.click(registerBtn);

  const errorMessage = screen.getByTestId(/alert-message/i)
  const error_message_btn =  screen.getByTestId(/error_message_btn/i);
  
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage.textContent).toBe("Invalid email");
  fireEvent.click(error_message_btn)
  expect(screen.queryByText("Invalid email")).toBeNull()
});  

test("User must confirm the password correctly before submitting the form", () => {
  render(<BrowserRouter>
    <Signup />
</BrowserRouter>);
  const firstName = screen.getByTestId(/signup_first_name/i);
  const lastName =  screen.getByTestId(/signup_last_name/i);
  const email =     screen.getByTestId(/signup_email/i);
  const password =  screen.getByTestId(/signup_password/i);
  const confirm_password =  screen.getByTestId(/confirm_password/i);
  const registerBtn = screen.getByTestId(/regitser_btn/i);
 
  fireEvent.change(firstName, { target: { value: 'mohamed' } });
  fireEvent.change(lastName, { target: { value: 'farag' } });
  fireEvent.change(email, { target: { value: 'test@gmail.com' } });
  fireEvent.change(password, { target: { value: 'Pass2022$$' } });
  fireEvent.change(confirm_password, { target: { value: 'pass' } });
  
  fireEvent.click(registerBtn);

  const errorMessage = screen.getByTestId(/alert-message/i)
  const error_message_btn =  screen.getByTestId(/error_message_btn/i);
  
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage.textContent).toBe("password must be the same");
  fireEvent.click(error_message_btn)
  expect(screen.queryByText("password must be the same")).toBeNull()
});  

test("User must provid the password specifications", () => {
  render(<BrowserRouter><Signup /></BrowserRouter>);

  const firstName = screen.getByTestId(/signup_first_name/i);
  const lastName =  screen.getByTestId(/signup_last_name/i);
  const email =     screen.getByTestId(/signup_email/i);
  const password =  screen.getByTestId(/signup_password/i);
  const confirm_password =  screen.getByTestId(/confirm_password/i);
  const registerBtn = screen.getByTestId(/regitser_btn/i);
 
  fireEvent.change(firstName, { target: { value: 'mohamed' } });
  fireEvent.change(lastName, { target: { value: 'farag' } });
  fireEvent.change(email, { target: { value: 'test@gmail.com' } });
  fireEvent.change(password, { target: { value: 'pass' } });
  fireEvent.change(confirm_password, { target: { value: 'pass' } });
  fireEvent.click(registerBtn);
  
  const errorMessage = screen.getByTestId(/alert-message/i)
  const error_message_btn =  screen.getByTestId(/error_message_btn/i);
  
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage.textContent).toBe("Password must be at least 8 characters and contains at least one capital letter, one digit and one symbol");
  fireEvent.click(error_message_btn)
  expect(screen.queryByText("Password must be at least 8 characters and contains at least one capital letter, one digit and one symbol")).toBeNull()
}); 