import axios from '../../../../services/axios';
import Axios from 'axios';

const api = `${process.env.REACT_APP_CATEGORIES}`;
const img = `${process.env.REACT_APP_USERS_URL}/upload-img`;

export const getAllCategories = async () => {
  const { data } = await axios.get(`${api}`).catch((err) => {
    return { data: [], error: 'something went wrong' };
  });
  return data;
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${api}/${id}`).catch((err) => {
    return { data: [], error: 'category not deleted something went wrong' };
  });
};

export const AddCategory = async (data) => {
  data.photo = await UploadImage(data.photo, data.title);

  return await axios.post(api, data).catch((err) => {
    return { data: [], error: 'category not added something went wrong' };
  });
};

async function UploadImage(photo, title) {
  if (typeof photo == 'string') return photo;

  const photoName = `category#${title.toLowerCase().replace(/\s/g, '-')}`;
  const photoType = photo[0]?.name.split('.')[1];

  const result = await axios.post(img, { name: photoName, type: photoType }).catch(() => {
    return { error: 'photo not added something went wrong' };
  });

  const url = result.data.url.split('?')[0];
  const blobData = new Blob([photo[0]], { type: `image/${photoType}` });

  await Axios.put(result.data.url, blobData, {
    headers: {
      'Content-Type': `image/${photoType}`,
    },
  }).catch(() => {
    return { error: 'photo not added something went wrong' };
  });

  return url;
}
