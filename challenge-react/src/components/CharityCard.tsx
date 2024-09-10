import React from 'react';
import '../styles/charityCard.css'

interface CharityCardProps {
  name: string;
  currency: string;
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
  onPay: () => void;
}

const CharityCard: React.FC<CharityCardProps> = ({name, currency, selectedAmount, onAmountChange, onPay}) => {
  const payments = [10, 20, 50, 100, 500].map((amount, index) => (
    <label key={index}>
      <input
        type="radio"
        name="payment"
        onClick={() => onAmountChange(amount)}
      />
      {amount}
    </label>
  ));

  return (
    <div className='card'>
      <p>{name}</p>
      {payments}
      <button onClick={onPay}>Pay {selectedAmount} {currency}</button>
    </div>
  );
}
export default CharityCard;
