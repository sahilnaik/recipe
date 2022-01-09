import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';

import ThemeContextWrapper from './themeContextWrapper';
ReactDOM.render(
  <ThemeContextWrapper>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ThemeContextWrapper>,
  document.getElementById('root')
);

