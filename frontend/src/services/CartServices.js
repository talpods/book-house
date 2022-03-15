export const GetCartItems = (storedCart) => {
  const promises = storedCart.map((p) =>
    fetch(`${process.env.REACT_APP_BOOKS_URL}/book/${p.slug}`)
      .then((response) => response.json())
      .then((data) => data.book),
  );

  return Promise.all(promises);
};
