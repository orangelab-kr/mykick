import React from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { QueryParamProvider } from 'use-query-params';
import { Started } from './components/started/Started';
import { Login } from './pages/auth/Login';
import { SignupAddress } from './pages/auth/signup/SignupAddress';
import { SignupComplete } from './pages/auth/signup/SignupComplete';
import { StartedComplete } from './pages/started/Complete';
import { SignupIdcard } from './pages/auth/signup/SignupIdcard';
import { SignupInfo } from './pages/auth/signup/SignupInfo';
import { SignupPayments } from './pages/auth/signup/SignupPayments';
import { Estimate } from './pages/started/Estimate';
import { Landing } from './pages/started/Landing';
import { MyCare } from './pages/started/MyCare';
import { MySafe } from './pages/started/MySafe';
import { Pricing } from './pages/started/Pricing';

export const baseURL =
  window.location.host === 'my.hikick.kr'
    ? 'https://my-api.hikick.kr/v1'
    : 'https://my-api.staging.hikick.kr/v1';

export const imageURL =
  window.location.host === 'my.hikick.kr'
    ? 'https://coreservice.hikick.kr/v1/images'
    : 'https://coreservice.staging.hikick.kr/v1/images';

const GlobalStyle = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
    font-family: 'NanumSquare', sans-serif;
  }
`;

const redirect = (to) => <Navigate to={to} />;

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <QueryParamProvider>
      <GlobalStyle>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route path='*' element={redirect('/')} />
              <Route path='started' element={<Started />}>
                <Route index element={<Landing />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='mysafe' element={<MySafe />} />
                <Route path='mycare' element={<MyCare />} />
                <Route path='estimate' element={<Estimate />} />
                <Route path='complete' element={<StartedComplete />} />
              </Route>
              <Route path='auth' element={<Started />}>
                <Route index element={redirect('/auth/login')} />
                <Route path='*' element={redirect('/auth/login')} />
                <Route path='login' element={<Login />} />
                <Route path='signup'>
                  <Route index element={redirect('/auth/signup/info')} />
                  <Route path='*' element={redirect('/auth/signup/info')} />
                  <Route path='info' element={<SignupInfo />} />
                  <Route path='address' element={<SignupAddress />} />
                  <Route path='idcard' element={<SignupIdcard />} />
                  <Route path='complete' element={<SignupComplete />} />
                  <Route path='payments' element={<SignupPayments />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalStyle>
    </QueryParamProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
