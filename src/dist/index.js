"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var Sentry = require("@sentry/react");
var tracing_1 = require("@sentry/tracing");
var reportWebVitals_1 = require("./reportWebVitals");
var layout_1 = require("./layout");
require("./styles/app.css");
require("./fonts/Gotham-Black.woff");
require("./fonts/Gotham-Black.woff2");
require("./fonts/Gotham-Bold.woff");
require("./fonts/Gotham-Bold.woff2");
require("./fonts/Gotham-BoldItalic.woff");
require("./fonts/Gotham-BoldItalic.woff2");
require("./fonts/Gotham-Book.woff");
require("./fonts/Gotham-Book.woff2");
require("./fonts/Gotham-BookItalic.woff");
require("./fonts/Gotham-BookItalic.woff2");
require("./fonts/Gotham-Light.woff");
require("./fonts/Gotham-Light.woff2");
require("./fonts/Gotham-LightItalic.woff");
require("./fonts/Gotham-LightItalic.woff2");
require("./fonts/Gotham-Medium.woff");
require("./fonts/Gotham-Medium.woff2");
require("./fonts/Gotham-MediumItalic.woff");
require("./fonts/Gotham-MediumItalic.woff2");
Sentry.init({
    dsn: 'https://5520fd9f111b475e874da04854b5c4cc@o921599.ingest.sentry.io/5868130',
    integrations: [new tracing_1.Integrations.BrowserTracing()],
    enabled: process.env.NODE_ENV !== 'development',
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
});
react_dom_1["default"].render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(layout_1.Root, null)), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1["default"]();
