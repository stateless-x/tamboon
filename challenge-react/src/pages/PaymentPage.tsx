import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Text  } from '@mantine/core';
import { usePayment } from '../hooks/usePayment';
import styled from 'styled-components';
import { formatCurrency } from '../helpers';
import useMobile from '../hooks/useMobile';

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


interface DonationAmountSelectionProps {
  isMobile: boolean;
  handleAmountClick: (amount: number) => void;
  selectedAmount: number | null;
};

interface CustomAmountProps {
  isMobile: boolean;
  customAmount: string;
  setCustomAmount: (amount: string) => void;
  setSelectedAmount: (amount: number | null) => void;
  validateDonation: (amount: string) => void;
  currency: string;
  error: string | null;
}

interface ConfirmButtonProps {
  handleConfirmDonation: () => void;
  selectedAmount: number | null;
  customAmount: string;
  error: string | null;
};

interface DonationDetailProps {
  name: string;
}

const PaymentPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handlePay } = usePayment();
  const { state } = useLocation();
  const isMobile = useMobile();
  const { name, currency, charityId } = state;
  const minDonationAmount:number = 5;
  const maxDonationAmount:number = 5000000;

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  const validateDonation = (value: string) => {
    const amount = Number(value.replace(/,/g, ''));
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
        <ReturnIcon />
        <DonationDetail name={name} />
        <DonationAmountSelection 
          isMobile={isMobile} 
          handleAmountClick={handleAmountClick} 
          selectedAmount={selectedAmount}
        />
        <CustomAmount 
          isMobile={isMobile} 
          customAmount={customAmount} 
          setCustomAmount={setCustomAmount} 
          setSelectedAmount={setSelectedAmount} 
          validateDonation={validateDonation} 
          currency={currency} 
          error={error} 
        />
        <ConfirmButton 
          handleConfirmDonation={handleConfirmDonation}
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          error={error}
        />
      </PaymentContainer>
    </PageWrapper>
  );
};

export default PaymentPage;

const ReturnIcon = () => {
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

  const navigate = useNavigate();

  return (
    <IconButtonContainer>
      <IconButton onClick={() => navigate('/')}>
        <img src="/icons/return.svg" alt="Return" width={24} height={24}/>
      </IconButton>
    </IconButtonContainer>
  )
};

const DonationDetail:React.FC<DonationDetailProps> = ({name}) => {
  const DonationDetailsContainer = styled.div`
  max-width:700px;
  margin: 24px auto;
  `;

  return (
    <DonationDetailsContainer>
      <Text fw={500} size="lg">You are donating to <Text span c="blue" fw={900} inherit>{name}</Text></Text>
      <Text fw={500} size="lg">Your generosity will greatly benefit the community.</Text>
    </DonationDetailsContainer>
  )
}

const DonationAmountSelection: React.FC<DonationAmountSelectionProps> = ({isMobile, handleAmountClick, selectedAmount}) =>{
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
  const amounts = [10, 20, 50, 100, 500, 1000];
  return (
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
  )
}

const CustomAmount: React.FC<CustomAmountProps> = ({isMobile, customAmount, setCustomAmount, setSelectedAmount, validateDonation, currency, error }) =>{
 const CurrencySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #131926;
    font-weight: bold;
  `

  return (
    <>
      <Input 
      size={isMobile ? 'md' : 'xl'}
      radius="md" 
      value={formatCurrency(customAmount)}
      type="text"
      placeholder="Enter custom amount"
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
    />
  {
    error && <Text style={{ margin:'auto', maxWidth: '700px'}}c="red" mt="sm">{error}</Text>
  }
  </>
  )
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({handleConfirmDonation, selectedAmount, customAmount, error}) => {
  const ConfirmContainer = styled.div`
  margin: 36px auto 0;
  max-width:700px;
  `

  return (
    <>
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
    </>
  )
}