import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppProps } from './types';
import styled from 'styled-components';
import CharityCardList from './components/CharityCardList';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '@mantine/core';

const AppContainer = styled.div`
  margin: 48px 96px;
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 120px;
  right: 20px;
  z-index: 999;
`;

const App: React.FC = () => {
  const donate = useSelector((state: AppProps) => state.donate);
  const message = useSelector((state: AppProps) => state.message);
  const [showNotification, setShowNotification] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // auto hide payment status
  useEffect(() => {
    if (location.state?.success !== undefined) {
      setPaymentSuccess(location.state?.success);
      setShowNotification(true);
      navigate('.', { replace: true, state: {} });
      setTimeout(() => setShowNotification(false), 5000);
    }
  }, [location.state, navigate]);
 
  return (
    <AppContainer>
      <p>All donations: {donate}</p>
      {showNotification && (
        <NotificationContainer>
          <Notification 
            color={paymentSuccess ? 'green' : 'red'}
            title={message} 
            onClose={() => { setShowNotification(false)}}
          >
          { paymentSuccess
              ? 'Thank you for your kindness.'
              : 'Something went wrong. Please try again later.'}
          </Notification>
        </NotificationContainer>
      )}
      <CharityCardList />
    </AppContainer>
  );
};

export default App;
