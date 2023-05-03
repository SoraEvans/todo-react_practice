import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import FontStyles from "./fonts"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FontStyles/>
    <App />
  </React.StrictMode>
);

reportWebVitals();
