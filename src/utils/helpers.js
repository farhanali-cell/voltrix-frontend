export const formatPKR = (value) => {
  const num = Number(value) || 0;
  return `Rs. ${num.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
};
