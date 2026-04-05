export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString, options = {}) => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};
