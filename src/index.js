import React from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { Started } from './components/started/Started';
import { Auth } from './pages/auth/Auth';
import { Login } from './pages/auth/Login';
import { Pricing } from './pages/auth/Pricing';

export const baseURL =
  window.location.host === 'my.hikick.kr'
    ? 'https://my-api.hikick.kr/v1'
    : 'https://my-api.staging.hikick.kr/v1';

const GlobalStyle = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
    font-family: 'NanumSquare', sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='auth' element={<Started />}>
              <Route index element={<Auth />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById('root')
);
