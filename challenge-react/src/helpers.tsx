export const summaryDonations = (donations: number[]):number =>
  donations.reduce((accumulator, value) => accumulator + value);

// add ',' to numbers eg: 1000 -> 1,000
export const formatCurrency = (value: string) => {
  if (!value) return '';
  const numValue = Number(value.replace(/,/g, ''));  
  return new Intl.NumberFormat('en-US').format(numValue);
}