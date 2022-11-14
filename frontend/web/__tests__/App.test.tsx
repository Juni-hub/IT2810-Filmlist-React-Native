import App from '../App';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from '@testing-library/react';
import store from '../redux/store';

/** 
* Test for app
*/
test('renders app', () => {
  render(
  <Provider store = {store}>
    <App />
  </Provider>
  );
});
  