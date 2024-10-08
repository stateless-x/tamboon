import { useEffect, useState } from 'react';
import { Charity, Payment } from '../types';
import { getCharities, getPayments } from '../services/services';
import { summaryDonations } from '../helpers';
import { useDispatch } from 'react-redux';

export const useCharities = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCharities = async () => {
      try {
        const charityData = await getCharities();
        setCharities(charityData);
      } catch (error) {
        console.error('loadCharitis failed:', error);
      }
    };

    const loadPayments = async () => {
      try {
        const payments: Payment[] = await getPayments();
        const totalDonations = summaryDonations(payments.map(payment => payment.amount));
        dispatch({ type: 'UPDATE_TOTAL_DONATE', amount: totalDonations });
      } catch (error) {
        console.error('loadPayments failed:', error);
      }
    };

    loadCharities();
    loadPayments();
  }, [dispatch]);

  return {
    charities,
  };
};
