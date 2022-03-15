export const currencyFormatter = (price) => {
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formater.format(price);
};

export const dateFormatter = (date) => {
  return new Date(date).toLocaleString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
