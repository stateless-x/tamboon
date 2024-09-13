import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Text, Title  } from '@mantine/core';
import { usePayment } from '../hooks/usePayment';
import styled from 'styled-components';
import { formatCurrency } from '../helpers';
import useMobile from '../hooks/useMobile';
import { ReactComponent as ReturnIcon } from '../../public/icons/return.svg';

const PageWrapper = styled.div`
  background-color: #e2e2e2; 
  min-height: 100vh;
  padding:20px;
`

const PaymentContainer = styled.div`
  background-color:white; 
  padding:48px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius:12px;
  margin: 0 280px;
  
  @media (max-width: 1024px) {
  margin: 0 auto;
  padding:20px;
  }
`

const ButtonsContainer = styled.div`
  display: grid;
  gap: 12px;
  justify-content: center;
  max-width:700px;
  grid-template-columns: repeat(6, 1fr);
  margin: 24px auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const CurrencySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #131926;
  font-weight: bold;
`

const ConfirmContainer = styled.div`
  margin: 36px auto 0;
  max-width:700px;
`

const DonationDetailsContainer = styled.div`
  max-width:700px;
  margin: 24px auto;
`;

const IconButtonContainer = styled.div`
  max-width:700px;
  margin: 24px auto;
  text-align:right;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const PaymentPage: React.FC = () => {
  const { state } = useLocation();
  const { name, currency, charityId } = state;
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const navigate = useNavigate();
  const { handlePay } = usePayment();
  const amounts = [10, 20, 50, 100, 500, 1000];
  const minDonationAmount:number = 5;
  const maxDonationAmount:number = 5000000;
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMobile();

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  const validateDonation = (value: string) => {
    const amount = Number(value.replace(/,/g, ''));
    console.log('validate', amount);
    if (amount < minDonationAmount) {
      setError(`Please donate more than ${minDonationAmount} ${currency}`);
    } else if (amount > maxDonationAmount) {
      setError(`Please donate less than ${formatCurrency(String(maxDonationAmount))} ${currency} We appreciate it` );
    } else {
      setError(null); 
    }
  };

  const handleConfirmDonation = async () => {
    const donationAmount = selectedAmount !== null ? selectedAmount : Number(customAmount.replace(/,/g, ''));
    console.log('customAmount', customAmount);
    console.log('selectedAmount', selectedAmount);
    console.log('donationAmount', donationAmount);
    if (charityId 
        && donationAmount >= minDonationAmount 
        && donationAmount <= maxDonationAmount
        && !error
    ) {
      const result = await handlePay(Number(charityId), Number(donationAmount), name, currency); 
      navigate('/', { state: { success: result }});
    }
  };

  return (
    <PageWrapper>
      <PaymentContainer>
        <IconButtonContainer>
          <IconButton onClick={() => navigate('/')}>
            <img src="/icons/return.svg" alt="Return" width={24} height={24}/>
          </IconButton>
        </IconButtonContainer>
        <DonationDetailsContainer>
          <Text fw={500} size="lg">You are donating to <Text span c="blue" fw={900} inherit>{name}</Text></Text>
          <Text fw={500} size="lg">Your generosity will greatly benefit the community.</Text>
        </DonationDetailsContainer>
        <ButtonsContainer>
        {amounts.map((amount) => (
          <Button
            size={isMobile ? 'md' : 'lg'}
            key={amount}
            onClick={() => handleAmountClick(amount)}
            variant={selectedAmount === amount ? 'filled' : 'outline'}
            color="#131926"
          >
            {amount}฿
          </Button>
        ))}
        </ButtonsContainer>
        <Input 
          size={isMobile ? 'md' : 'xl'}
          radius="md" 
          value={formatCurrency(customAmount)}
          type="text"
          onChange={(event) => {
            const value = event.currentTarget.value.replace(/[^\d,]/g, '');
            setCustomAmount(value);
            setSelectedAmount(null);
            validateDonation(value)
          }}
          style={{ 
            maxWidth:'700px',
            margin:'auto',
            fontWeight:'bold',
          }}
          rightSection={
          <CurrencySection>
            { !isMobile && (<span style={{fontSize:'24px', lineHeight:'24px'}}>฿</span>) }
            <span>{currency}</span>
          </CurrencySection>
          }
        placeholder="Enter custom amount"/>
        {error && <Text style={{ margin:'auto', maxWidth: '700px'}}c="red" mt="sm">{error}</Text>}

        <ConfirmContainer>
          <Button 
            onClick={handleConfirmDonation} 
            disabled={!selectedAmount && !customAmount || error !== null} 
            color="#131926"
            fullWidth
            size="lg"
          >
            Confirm Donation
          </Button>
        </ConfirmContainer>
      </PaymentContainer>
    </PageWrapper>
  );
};

export default PaymentPage;
