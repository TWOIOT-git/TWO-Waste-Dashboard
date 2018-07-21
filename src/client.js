import App from './applications'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'
import { hydrate } from 'react-dom'
import MobileDetect from 'mobile-detect'


const md = new MobileDetect(window.navigator.userAgent);

let defaultScreenClass = 'xl';

if (md.phone() !== null) defaultScreenClass = 'xs';
if (md.tablet() !== null) defaultScreenClass = 'md';

hydrate(
  <BrowserRouter>
    <App defaultScreenClass={defaultScreenClass} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
