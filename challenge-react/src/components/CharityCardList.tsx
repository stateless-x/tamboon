import React from 'react';
import CharityCard from '../components/CharityCard';
import { useCharities } from '../hooks/useCharities';
import { CardListLayout } from '../styles/App.styled';
import { usePayment } from '../hooks/usePayment';

const CharityCardList: React.FC = () => {
  const { charities, selectedAmount, handleAmountChange } = useCharities();
  const { handlePay } = usePayment();

  return (
    <CardListLayout>
    {charities.map((charity) => (
      <CharityCard
        key={charity.id}
        name={charity.name}
        currency={charity.currency}
        selectedAmount={selectedAmount}
        onAmountChange={handleAmountChange}
        onPay={() => handlePay(charity.id, selectedAmount, charity.name, charity.currency)}
        imageUrl={charity.image}
      />
    ))}
  </CardListLayout>
  )
};

export default CharityCardList;