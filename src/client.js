import App from './applications'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'
import MobileDetect from 'mobile-detect'
import { hydrate } from 'react-dom'
import { UserProvider } from './providers/UserProvider';


const md = new MobileDetect(window.navigator.userAgent);

let defaultScreenClass = 'xl';

if (md.phone() !== null) defaultScreenClass = 'xs';
if (md.tablet() !== null) defaultScreenClass = 'md';

hydrate(
  <BrowserRouter>
    <UserProvider>
      <App defaultScreenClass={defaultScreenClass} />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
