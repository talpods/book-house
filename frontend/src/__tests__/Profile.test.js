import { render, screen,fireEvent } from '@testing-library/react';
import ProfileInfo from '../components/ProfileInfo';
import UserOrders from '../components/UserOrders';
import Profile from '../screens/customer/Profile'
import {mockUserOrders} from '../mock_data/orders'
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';


test('user informations are displayed correctly',async () => {
  render(<ProfileInfo data={{"id":"1",
  "first_name": "Leanne",
  "last_name": "Graham",
  "email": "Sincere@april.biz",
  "address" : "apatment 2 st.4",
  "phone": "0102333333333",
  "photo": "https://tvline.com/wp-content/uploads/2021/08/OKOP-Yaya-DaCosta-.jpg"}} />);

  const first_name =   screen.getByTestId(/first_name/i);
  const last_name =    screen.getByTestId(/last_name/i);
  const email =        screen.getByTestId(/email/i);
  const phone =        screen.getByTestId(/phone/i);
  
  expect(first_name).toBeInTheDocument();
  expect(last_name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
  
});

test('user edit profile form is rendered correctly',async () => {
  render(<EditProfile />);
  
  const first_name =   screen.getByTestId(/edit_first_name/i);
  const last_name =    screen.getByTestId(/edit_last_name/i);
  const email =        screen.getByTestId(/edit_email/i);
  const phone =        screen.getByTestId(/edit_phone/i);
  const save_profile = screen.getByTestId(/edit_profile_save/i);
  
  //check that all the input fields are there 
  expect(first_name).toBeInTheDocument();
  expect(last_name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
  expect(save_profile).toBeInTheDocument();
  
});

test('user change password form is rendered correctly', async() => {
  render(<ChangePassword />);
  
  const edit_pass_old =      screen.getByTestId("edit_pass_old");
  const edit_pass_new =      screen.getByTestId("new_password");
  const edit_pass_confirm =  screen.getByTestId("confirm_new_password");
  const change_pass_btn =      screen.getByTestId("change_pass_btn");
  
  
  expect(edit_pass_old).toBeInTheDocument();
  expect(edit_pass_old.type).toBe("password")
  expect(edit_pass_old.required).toBe(true)
  expect(edit_pass_new).toBeInTheDocument();
  expect(edit_pass_new.type).toBe("password")
  expect(edit_pass_new.required).toBe(true)
  expect(edit_pass_confirm).toBeInTheDocument();
  expect(edit_pass_confirm.type).toBe("password")
  expect(edit_pass_confirm.required).toBe(true)
  expect(change_pass_btn).toBeInTheDocument();
});


test('check for user orders table',async () => {
  render(<UserOrders orders={mockUserOrders} />);
  const orders_table =   screen.getByTestId(/orders_table/i);
  expect(orders_table).toBeInTheDocument();

});
