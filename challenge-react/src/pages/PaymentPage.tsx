import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Text } from '@mantine/core';
import { usePayment } from '../hooks/usePayment';
import styled from 'styled-components';
import { formatCurrency } from '../helpers';

const PageWrapper = styled.div`
  background-color: #e2e2e2; 
  min-height: 100vh;
  padding:20px;
`

const PaymentContainer = styled.div`
  background-color:white; 
  padding:20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius:12px;
  margin: 0 280px;
`

const ButtonsContainer = styled.div`
  display:flex;
  gap:12px;
  justify-content:center;
  margin 10px 0;
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
  width:632px;
`
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
        <h2>Select Donation Amount for Charity {charityId}: {name}</h2>
        <ButtonsContainer>
        {amounts.map((amount) => (
          <Button
          size='lg'
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
          size="xl" 
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
            width:'632px',
            margin:'auto',
            fontWeight:'bold',
          }}
          rightSection={
          <CurrencySection>
            <span style={{fontSize:'24px', lineHeight:'24px'}}>฿</span>
            <span>{currency}</span>
          </CurrencySection>
          }
        placeholder="Enter custom amount"/>
        {error && <Text style={{ textAlign:'center' }}c="red" mt="sm">{error}</Text>}

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
