import { Charity, Payment } from '../types';
import { CHARITIES_API, PAYMENTS_API } from '../constants';
import axios from 'axios';

export async function getCharities(): Promise<Charity[]> {
  try {
    const response = await axios.get<Charity[]>(CHARITIES_API);
    return response.data;
  } catch (error) {
    throw new Error(`Error unable to get charities: ${error}`);
  }
}

export async function getPayments(): Promise<Payment[]> {
  try {
    const response = await axios.get<Payment[]>(PAYMENTS_API);
    return response.data;
  } catch (error) {
    throw new Error(`Error unable to get payments: ${error}`);
  }
}

export async function makePayment(id: number, amount: number, currency: string) {
  try {
    const response = await axios.post(PAYMENTS_API, {
      charitiesId: id,
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error unable to make a payment: ${error}`);
  }
}