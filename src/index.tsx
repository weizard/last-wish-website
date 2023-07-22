import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Web3OnboardProvider } from '@web3-onboard/react';
import reportWebVitals from './reportWebVitals';
import web3Onboard from 'src/libs/web3-onboard';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3OnboardProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
