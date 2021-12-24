import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import * as dotenv from 'dotenv'
import './style/font.css'
import './fonts/clacon.ttf'
import './fonts/Gotham-Black.woff';
import './fonts/Gotham-Black.woff2';
import './fonts/Gotham-Bold.woff';
import './fonts/Gotham-Bold.woff2';
import './fonts/Gotham-BoldItalic.woff';
import './fonts/Gotham-BoldItalic.woff2';
import './fonts/Gotham-Book.woff';
import './fonts/Gotham-Book.woff2';
import './fonts/Gotham-BookItalic.woff';
import './fonts/Gotham-BookItalic.woff2';
import './fonts/Gotham-Light.woff';
import './fonts/Gotham-Light.woff2';
import './fonts/Gotham-LightItalic.woff';
import './fonts/Gotham-LightItalic.woff2';
import './fonts/Gotham-Medium.woff';
import './fonts/Gotham-Medium.woff2';
import './fonts/Gotham-MediumItalic.woff';
import './fonts/Gotham-MediumItalic.woff2';
import { BrowserRouter as Router } from "react-router-dom";

dotenv.config()

// console.log('process env api in root index', process.env.api)
Sentry.init({
  dsn: 'https://5520fd9f111b475e874da04854b5c4cc@o921599.ingest.sentry.io/5868130',
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.NODE_ENV !== 'development',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL} >
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()