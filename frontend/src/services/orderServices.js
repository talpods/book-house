import axios from './axios';

export const getOrdersForUser = async (email, last, limit) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_ORDERS_URL}/user/${email}`, {
      headers: {
        limit: limit,
        last: JSON.stringify(last),
      },
    });
    return data;
  } catch (err) {
    return { err: 'something went wrong' };
  }
};
