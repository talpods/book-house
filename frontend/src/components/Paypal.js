import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useHistory } from 'react-router-dom';
import axios from '../services/axios';
import { useState } from 'react';
import { deleteOrder } from '../screens/admin/orders/services/admin.orders.service';
import Alert from './Alert';

const initialOptions = {
  'client-id': 'AV1NZf6O0MIYTFFqKCGtVI4zeeHjNFAKzBJvtMHZh5v9toQYdZ4wmmtgFOdDqhwdaKzzspyQZsVOZ38T',
  currency: 'USD',
  intent: 'capture',
};

export default function Paypal({ items, shipping, setCartItemsCount }) {
  let order_id;
  const [error, setError] = useState();
  const [x] = useState(shipping);
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  const initailizeOrder = async () => {
    try {
      const street = document.getElementById('street').value;
      const suite = document.getElementById('suite').value;
      const city = document.getElementById('city').value;
      const zipcode = document.getElementById('zipcode').value;
      console.log('data', street, suite, city, zipcode);
      if (!street || !suite || !city || !zipcode) throw new Error('Please enter your shipping details');

      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
      const products = cart.map((e) => {
        return { sk: `books#${e.slug}`, quantity: e.quantity };
      });

      const { data } = await axios.post(`${process.env.REACT_APP_ORDERS_URL}/payment`, {
        products,
        shipping: { street, suite, city, zipcode },
      });

      order_id = data.order_id;
      return data.id;
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const confirmOrder = async () => {
    try {
      await axios.post(process.env.REACT_APP_ORDERS_URL, {
        order_id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const CancelOrder = async () => {
    if (order_id) {
      await deleteOrder(order_id);
    }
    setError('somthing went wrong when trying to checkout');
  };

  if (items.length < 1) {
    return <div>Add Items to the cart to checkout</div>;
  }
  if (error) {
    return (
      <div className="w-full flex flex-col items-center">
        <Alert status={'fail'} message={error} />
        <button className="font-semibold mt-2" onClick={() => setError(null)}>
          Please try again
        </button>
      </div>
    );
  }
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: 'horizontal', height: 50, color: 'white' }}
        createOrder={initailizeOrder}
        onApprove={async (data, actions) => {
          await confirmOrder();
          //await actions.order.capture();
          localStorage.setItem('cart', JSON.stringify([]));
          setCartItemsCount(0);
          history.push('/paymentsuccess');
        }}
        onError={(data, actions) => {
          console.log('error', data);
          setTimeout(() => {
            CancelOrder();
          }, 0);
        }}
      />
    </PayPalScriptProvider>
  );
}
