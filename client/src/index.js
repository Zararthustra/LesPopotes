import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import './styles/App.css';
import './styles/navbar.css';
import './styles/lapopote/lapopote.css';
import './styles/lespopotes/lespopotes.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
