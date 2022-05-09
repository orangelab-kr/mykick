import React from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { QueryParamProvider } from 'use-query-params';
import { LoginCheck } from './components/LoginCheck';
import { Started } from './components/started/Started';
import { Login } from './pages/auth/Login';
import { SignupAddress } from './pages/auth/signup/SignupAddress';
import { SignupComplete } from './pages/auth/signup/SignupComplete';
import { SignupIdcard } from './pages/auth/signup/SignupIdcard';
import { SignupInfo } from './pages/auth/signup/SignupInfo';
import { SignupPayments } from './pages/auth/signup/SignupPayments';
import { Token } from './pages/auth/Token';
import { RentActivate } from './pages/rents/Activate';
import { RentDetails } from './pages/rents/Details';
import { RentList } from './pages/rents/List';
import { RentSettings } from './pages/rents/Settings';
import { RentStatus } from './pages/rents/Status';
import { Addons } from './pages/started/Addons';
import { StartedComplete } from './pages/started/Complete';
import { Estimate } from './pages/started/Estimate';
import { Landing } from './pages/started/Landing';
import { MyCare } from './pages/started/MyCare';
import { MySafe } from './pages/started/MySafe';
import { Pricing } from './pages/started/Pricing';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import SentryRRWeb from '@sentry/rrweb';

export const baseURL =
  window.location.host === 'my.hikick.kr'
    ? 'https://my-api.hikick.kr/v1'
    : 'https://my-api.staging.hikick.kr/v1';

export const imageURL =
  window.location.host === 'my.hikick.kr'
    ? 'https://coreservice.hikick.kr/v1/images'
    : 'https://coreservice.staging.hikick.kr/v1/images';

Sentry.init({
  dsn: 'https://e15f7ca1a9994d3fb7133ff02b2eee6e@sentry.dan.al/11',
  integrations: [new SentryRRWeb(), new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const gtmId =
  window.location.host === 'my.hikick.kr' ? 'G-N6GR1ZX2NR' : 'G-HK0V8EDDJG';

const GlobalStyle = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
    font-family: 'NanumSquare', sans-serif;
  }
`;

TagManager.initialize({ gtmId });
const redirect = (to) => <Navigate to={to} />;

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <RenderAfterNavermapsLoaded ncpClientId='38urtsu6oc'>
      <QueryParamProvider>
        <GlobalStyle>
          <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route index element={<LoginCheck />} />
                <Route path='*' element={redirect('/')} />
                <Route path='started' element={<Started />}>
                  <Route index element={<Landing />} />
                  <Route path='pricing' element={<Pricing />} />
                  <Route path='mysafe' element={<MySafe />} />
                  <Route path='mycare' element={<MyCare />} />
                  <Route path='addons' element={<Addons />} />
                  <Route path='estimate' element={<Estimate />} />
                  <Route path='complete' element={<StartedComplete />} />
                </Route>
                <Route path='rents' element={<Started />}>
                  <Route index element={<RentList />} />
                  <Route path=':rentId' element={<RentDetails />} />
                  <Route path=':rentId/status' element={<RentStatus />} />
                  <Route path=':rentId/activate' element={<RentActivate />} />
                  <Route path=':rentId/settings' element={<RentSettings />} />
                </Route>
                <Route path='auth' element={<Started />}>
                  <Route index element={redirect('/auth/login')} />
                  <Route path='*' element={redirect('/auth/login')} />
                  <Route path='login' element={<Login />} />
                  <Route path='token' element={<Token />} />
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
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>,
  document.getElementById('root')
);
