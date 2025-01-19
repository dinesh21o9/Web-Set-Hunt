import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="116178394895-771o63fk03qjh5vk361q2r256i05d7vn.apps.googleusercontent.com">
      <Provider store={store}>
       <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// reportWebVitals();
