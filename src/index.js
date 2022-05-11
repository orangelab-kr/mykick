import React from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { QueryParamProvider } from 'use-query-params';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import SentryRRWeb from '@sentry/rrweb';
import { Router } from './router';

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

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <RenderAfterNavermapsLoaded ncpClientId='38urtsu6oc'>
      <QueryParamProvider>
        <GlobalStyle>
          <Router />
        </GlobalStyle>
      </QueryParamProvider>
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>,
  document.getElementById('root')
);
