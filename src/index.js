import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
      <AppProvider i18n={enTranslations}>
        <Provider store={store}>
          <App />
        </Provider>
      </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


