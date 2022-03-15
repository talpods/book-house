import axios from './axios';
export const getAllBooks = async (limit, last) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BOOKS_URL}`, {
      headers: {
        limit: limit,
        last: JSON.stringify(last),
      },
    });
    return { result: data.result.books, last: data.result.last, pages: data.count };
  } catch (err) {
    console.log(err);
    return { result: [], err };
  }
};

export const getSingleBook = async (title) => {
  try {
    const { data: result } = await axios.get(`${process.env.REACT_APP_BOOKS_URL}/book/${title}`);
    return { result: result.book };
  } catch (err) {
    console.log(err);
    return { result: [], err };
  }
};

export const getBooksByCategory = async (category) => {
  try {
    const { data: result } = await axios.get(`${process.env.REACT_APP_BOOKS_URL}/category/${category}`);
    return { similar: result.books, last: result.last };
  } catch (err) {
    console.log('err', err);
    return { similar: [], err };
  }
};

export const getAllCategories = async () => {
  try {
    const { data: result } = await axios.get(`${process.env.REACT_APP_CATEGORIES}`);
    return { result };
  } catch (err) {
    console.log('err', err);
    return { result: [], err };
  }
};
