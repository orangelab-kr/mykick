import React from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { Started } from './components/started/Started';
import { Login } from './pages/auth/Login';
import { SignupAddress } from './pages/auth/signup/SignupAddress';
import { SignupInfo } from './pages/auth/signup/SignupInfo';
import { Estimate } from './pages/started/Estimate';
import { Main } from './pages/started/Main';
import { MyCare } from './pages/started/MyCare';
import { MySafe } from './pages/started/MySafe';
import { Pricing } from './pages/started/Pricing';

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
            <Route index element={<Navigate to='/started' />} />
            <Route path='started' element={<Started />}>
              <Route index element={<Main />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='mysafe' element={<MySafe />} />
              <Route path='mycare' element={<MyCare />} />
              <Route path='estimate' element={<Estimate />} />
            </Route>
            <Route path='auth' element={<Started />}>
              <Route index element={<Navigate to='/auth/login' />} />
              <Route path='login' element={<Login />} />
              <Route path='signup'>
                <Route index element={<Navigate to='/auth/signup/info' />} />
                <Route path='info' element={<SignupInfo />} />
                <Route path='address' element={<SignupAddress />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById('root')
);
