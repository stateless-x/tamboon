import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppProps } from './types';
import styled from 'styled-components';
import CharityCardList from './components/CharityCardList';

const AppContainer = styled.div`
  margin: 48px 96px;
`;

const App: React.FC = () => {
  const donate = useSelector((state: AppProps) => state.donate);
  const message = useSelector((state: AppProps) => state.message);

  useEffect(() => {
    console.log('donate', donate)
  },[donate])

  return (
    <AppContainer>
      {/* will add a toast or something later */}
      <p>All donations: {donate}</p>
      <p>message: {message}</p>
      {/*  */}
      <CharityCardList />
    </AppContainer>
  );
};

export default App;
