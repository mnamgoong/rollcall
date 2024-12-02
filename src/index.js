import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mPEEh4Bud",
  client_id: "6ihgv04tth5if17o08l7liq1co",
  redirect_uri: "http://localhost:3000",
  post_logout_redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "email profile openid phone",
};

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

