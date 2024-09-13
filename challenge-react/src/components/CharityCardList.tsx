import React from 'react';
import CharityCard from '../components/CharityCard';
import { useCharities } from '../hooks/useCharities';
import { useCharityDonations } from '../hooks/useCharityDonations';

import styled from 'styled-components';

const CardListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px; 
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CharityCardList: React.FC = () => {
  const { charities } = useCharities();
  const { donations } = useCharityDonations(); 
  return (
    <CardListLayout>
    {charities
    .sort((a, b) => (donations[a.id] || 0) - (donations[b.id] || 0))
    .map((charity) => (
      <CharityCard
        key={charity.id}
        name={charity.name}
        currency={charity.currency}
        charityId={charity.id}
        imageUrl={charity.image}
        totalDonations={donations[charity.id] || 0}
      />
    ))}
  </CardListLayout>
  )
};

export default CharityCardList;