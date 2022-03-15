import Axios from 'axios';
import axios from './axios';
const userData = JSON.parse(localStorage.getItem('userData')) || null;

export const updateProfile = async (newData) => {
  try {
    const { data } = await axios.put(process.env.REACT_APP_USERS_URL, newData, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    return {
      data: data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err.response.data.message.replaceAll(`"`, '').replace('_', ' '),
    };
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_USERS_URL}/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      },
    );
    return {
      data: data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err.response.data.message.replaceAll(`"`, '').replace('_', ' '),
    };
  }
};

export async function UploadImage(user) {
  if (typeof user.photo == 'string') return user.photo;

  const photoName = `users#${user.email.toLowerCase()}`;
  const photoType = user.photo[0]?.name.split('.')[1];

  const result = await axios
    .post(`${process.env.REACT_APP_USERS_URL}/upload-img`, { name: photoName, type: photoType })
    .catch(() => {
      return { error: 'photo not added something went wrong' };
    });

  const url = result.data.url.split('?')[0];
  console.log(url);
  const blobData = new Blob([user.photo[0]], { type: `image/${photoType}` });

  await Axios.put(result.data.url, blobData, {
    headers: {
      'Content-Type': `image/${photoType}`,
    },
  }).catch(() => {
    return { error: 'photo not added something went wrong' };
  });

  delete user.email;
  user.photo = url;
  await updateProfile(user);
  return url;
}
