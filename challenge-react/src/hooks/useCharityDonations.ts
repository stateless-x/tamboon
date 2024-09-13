import { useEffect, useState } from 'react';
import { Payment } from '../types';
import { getPayments } from '../services/services';

interface CharityDonations {
  [charityId: number]: number;
}

export const useCharityDonations = () => {
  const [donations, setDonations] = useState<CharityDonations>({});

  useEffect(() => {
    const getCharityDonationAmounts = async () => {
      try {
        const payments: Payment[] = await getPayments();
        //map donation amount by id
        const donationsMap: CharityDonations = payments.reduce((donationsByCharity: CharityDonations, payment) => {
          donationsByCharity[payment.charitiesId] = (donationsByCharity[payment.charitiesId] || 0) + payment.amount;
          return donationsByCharity;
        }, {});
        setDonations(donationsMap);
      } catch (error) {
        console.error('Failed to load donations:', error);
      }
    };

    getCharityDonationAmounts();
  }, []);

  return { donations };
};
