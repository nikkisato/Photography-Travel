import ReactDom from 'react-dom';
import React from 'react';
import App from './App';
import theme from './utils/theme';
import GlobalStyles from './utils/global';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

ReactDom.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <>
        <App />
        <GlobalStyles />
      </>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
