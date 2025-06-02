// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { PubkeyProvider } from './context/PubKeyContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PubkeyProvider>
      <App />
    </PubkeyProvider>
  </BrowserRouter>
);
