import React from 'react';
import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface CharityCardProps {
  name: string;
  currency: string;
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
  charityId: number;
  imageUrl: string;
}

const CharityCard: React.FC<CharityCardProps> = ({name, currency, charityId, imageUrl}) => {
  const navigate = useNavigate();
  const handleDonateClicked = () => {
    navigate('/payment', {
      state: {
        name,
        currency,
        charityId,
      },
    });
  }

  return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`images/${imageUrl}`}
          height={280}
          alt="donation"
          loading="lazy"
        />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500}>{name}</Text>
        <Button 
          onClick={handleDonateClicked}
          variant='filled'
          color='#131926'
        >
          Donate
        </Button>
      </Group>
    </Card>
  );
}
export default CharityCard;
