import React from 'react';
import { useSelector } from 'react-redux';
import { AppProps } from './types';
import CharityCard from './components/CharityCard';
import { useCharities } from './hooks/useCharities';
import { usePayment } from './hooks/usePayment';
import './styles/app.css';

const App: React.FC = () => {
  const { charities, selectedAmount, handleAmountChange } = useCharities();
  const { handlePay } = usePayment();

  const donate = useSelector((state: AppProps) => state.donate);
  const message = useSelector((state: AppProps) => state.message);

  return (
    <div>
      <h1>Tamboon React</h1>
      {/* will add a toast or something later */}
      <p className="textStyle">All donations: {donate}</p>
      <p className="textStyle">message: {message}</p>
      {/*  */}
      {charities.map((charity) => (
        <CharityCard
          key={charity.id}
          name={charity.name}
          currency={charity.currency}
          selectedAmount={selectedAmount}
          onAmountChange={handleAmountChange}
          onPay={() => handlePay(charity.id, selectedAmount, charity.name, charity.currency)}
        />
      ))}
    </div>
  );
};

export default App;
