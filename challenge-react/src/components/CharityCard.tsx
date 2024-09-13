import React from 'react';
import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useMobile from '../hooks/useMobile';

interface CharityCardProps {
  name: string;
  currency: string;
  charityId: number;
  imageUrl: string;
  totalDonations: number; 
}

const CharityCard: React.FC<CharityCardProps> = ({name, currency, charityId, imageUrl, totalDonations}) => {
  const navigate = useNavigate();
  const isMobile = useMobile();

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

      <Group 
        mt="lg"
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'center' : '',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Text fw={500}>{name}</Text>
      </Group>
      <Group 
        mt="sm"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: isMobile ? 'center' : 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        <Text>Total donation:
        &nbsp;
            <Text span c={totalDonations === 0 ? 'red' : 'black'} fw={900} inherit>
            {totalDonations}
            </Text>
        &nbsp;
        {currency}
        </Text>

        <Button 
            onClick={handleDonateClicked}
            variant='filled'
            color='#131926'
            fullWidth={isMobile}
        >
          Donate
        </Button>
      </Group>
    </Card>
  );
}
export default CharityCard;
