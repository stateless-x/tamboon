import React from 'react';
import { Card, Image, Text, Button, Group } from '@mantine/core';

interface CharityCardProps {
  name: string;
  currency: string;
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
  onPay: () => void;
  imageUrl: string;
}

const CharityCard: React.FC<CharityCardProps> = ({name, currency, selectedAmount, onAmountChange, onPay, imageUrl}) => {
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
  console.log('imageUrl', imageUrl);
  return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`images/${imageUrl}`}
          height={280}
          alt="donation"
        />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500}>{name}</Text>
        <Button 
          onClick={onPay}
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
