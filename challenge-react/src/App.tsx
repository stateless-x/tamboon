import React from 'react';
import { useSelector } from 'react-redux';
import { AppProps } from './types';
import { AppContainer } from './styles/App.styled';
import CharityCardList from './components/CharityCardList';

const App: React.FC = () => {
  const donate = useSelector((state: AppProps) => state.donate);
  const message = useSelector((state: AppProps) => state.message);

  return (
    <AppContainer>
      <h1>Tamboon React</h1>
      {/* will add a toast or something later */}
      <p>All donations: {donate}</p>
      <p>message: {message}</p>
      {/*  */}
      <CharityCardList />
    </AppContainer>
  );
};

export default App;
