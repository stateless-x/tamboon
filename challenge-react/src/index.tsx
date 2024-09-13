import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {DonationState, DonationAction } from './types';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';

const store = createStore(function (state:DonationState, action:DonationAction) {
  const _state:DonationState =
    state == null
      ? {
          donate: 0,
          message: '',
        }
      : state;

  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return Object.assign({}, _state, {
        ...state,
        donate: action.amount,
      });
    case 'UPDATE_MESSAGE':
      return Object.assign({}, _state, {
        message: action.message,
      });

    default:
      return _state;
  }
});

const container = document.getElementById('root');
const root = createRoot(container,);

root.render(
  <>
  <Provider store={store}>
    <MantineProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  </Provider>
  </>
);