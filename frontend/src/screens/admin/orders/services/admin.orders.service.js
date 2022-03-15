import axios from '../../../../services/axios';

const api = `${process.env.REACT_APP_ORDERS_URL}`;

export const getAllOrders = async (last, limit) => {
  const { data } = await axios
    .get(`${api}`, {
      headers: {
        limit: limit,
        last: JSON.stringify(last),
      },
    })
    .catch((err) => console.log(err));
  return { data: data.orders, last: data.last, pages: data.pages };
};

export const deleteOrder = async (id, message) => {
  const { data } = await axios
    .delete(`${api}/${id}`, {
      data: {
        message,
      },
    })
    .catch((err) => console.log(err));
  return data;
};
