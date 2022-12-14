import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import './utils/i18n';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMyTheme from './styles';

const theme = createMyTheme();
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
