import axios from './axios';

export const userSignIn = async (email, password) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_USERS_URL}/sign-in`, {
      email,
      password,
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return {
      data,
      error: null,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: err.response.data.message.replaceAll(`"`, '').replace('_', ' '),
    };
  }
};

export const signUp = async (first_name, last_name, email, password) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_USERS_URL}`, {
      first_name,
      last_name,
      email,
      password,
    });
    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err.response.data.message.replaceAll(`"`, '').replace('_', ' '),
    };
  }
};

export const handleLogout = () => {
  localStorage.removeItem('userData');
  window.location.href = '/';
};
