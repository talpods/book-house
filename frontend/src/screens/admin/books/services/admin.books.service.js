import Axios from 'axios';
import axios from '../../../../services/axios';
const api = `${process.env.REACT_APP_BOOKS_URL}`;
const img = `${process.env.REACT_APP_USERS_URL}/upload-img`;

export const getAllBooks = async (last) => {
  const { data } = await axios
    .get(`${process.env.REACT_APP_BOOKS_URL}`, {
      headers: {
        limit: 10,
        last: JSON.stringify(last),
      },
    })
    .catch((err) => {
      return { result: [], error: 'something went wrong' };
    });
  return { result: data.result.books, last: data.result.last, pages: data.count };
};

export const deleteBook = async (slug) => {
  return await axios.delete(`${api}/delete-book/${slug}`).catch((err) => {
    return { result: [], error: 'book not deleted something went wrong' };
  });
};

export const addBook = async (data) => {
  data.photo = await UploadImage(data.photo, data.title);

  return await axios.post(api, data).catch((err) => {
    return { result: [], error: 'book not added something went wrong' };
  });
};

export const updateBook = async (data) => {
  data.photo = await UploadImage(data.photo, data.title);

  const slug = data.slug;
  delete data.slug;

  return await axios.patch(`${api}/update-book/${slug}`, data).catch((err) => {
    return { result: [], error: 'book not updated something went wrong' };
  });
};

async function UploadImage(photo, title) {
  if (typeof photo == 'string') return photo;

  const photoName = `books#${title.toLowerCase().replace(/\s/g, '-')}`;
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
