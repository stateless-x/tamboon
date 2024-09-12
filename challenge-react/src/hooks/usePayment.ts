import { makePayment } from '../services/services';
import { useDispatch } from 'react-redux';

export const usePayment = () => {
  const dispatch = useDispatch();
  const handlePay = async (id: number, amount: number, charityName:string , currency: string) => {
    try {
      await makePayment(id, amount, currency);
      dispatch({ type: 'UPDATE_MESSAGE', message: 'Payment success!' });
      return true;
    } catch (error) {
      dispatch({ type: 'UPDATE_MESSAGE', message: 'Payment failed' });
      console.error('payment failed:', error);
      return false;
    }
  };

  return { handlePay };
};
