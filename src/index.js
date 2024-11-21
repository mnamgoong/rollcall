import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';  // Import withAuthenticator for login flow
import config from './aws-exports';

// Configure Amplify with your AWS settings (including Cognito and Google)
Amplify.configure({
  ...config,
  API: {
    endpoints: [
      {
        name: "sendFormData",
        endpoint: config.aws_cloud_logic_custom[0].endpoint
      }
    ]
  }
});

// Wrap your App component with the withAuthenticator HOC (Higher-Order Component) to show Google Sign-In
const AppWithAuth = withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number'], // Optional: Hide phone number during sign up
  },
  socialProviders: ['google'], // Enable Google as a social sign-in provider
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithAuth />  {/* This will show the authentication UI (Google Sign-In) if the user is not logged in */}
  </React.StrictMode>
);

// Optionally, you can measure performance in your app with Web Vitals
reportWebVitals();
