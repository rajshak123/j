import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import MainLayout from '@components/MainLayout';


import store from './store';



const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        
        <Route path='/' exact component={MainLayout} />
        
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();
