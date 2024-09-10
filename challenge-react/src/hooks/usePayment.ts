import { makePayment } from '../services/services';
import { useDispatch } from 'react-redux';

export const usePayment = () => {
  const dispatch = useDispatch();
  const handlePay = async (id: number, amount: number, charityName:string , currency: string) => {
    try {
      await makePayment(id, amount, currency);
      dispatch({ type: 'UPDATE_MESSAGE', message: `Successfully donated ${amount} ${currency} to ${charityName}!` });
    } catch (error) {
      dispatch({ type: 'UPDATE_MESSAGE', message: 'Payment failed. Please try again.' });
      console.error('payment failed:', error);
    }
  };

  return { handlePay };
};
