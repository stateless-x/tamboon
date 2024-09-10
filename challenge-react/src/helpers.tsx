export const summaryDonations = (donations: number[]):number =>
  donations.reduce((accumulator, value) => accumulator + value);
