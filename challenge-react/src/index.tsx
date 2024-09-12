import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {DonationState, DonationAction } from './types';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import NavBar from './components/NavBar';

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
        donate: _state.donate + action.amount,
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
  <Provider store={store}>
    <MantineProvider>
      <NavBar />
      <App />
    </MantineProvider>
  </Provider>
);