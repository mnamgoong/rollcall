import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import App from './App';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mPEEh4Bud",  // Cognito authority URL
  client_id: "6ihgv04tth5if17o08l7liq1co",  // Your Cognito client ID
  redirect_uri: "http://localhost:3000",  // URL to redirect after login
  post_logout_redirect_uri: "http://localhost:3000",
  response_type: "code",  // OAuth response type
  scope: "email profile openid phone",  // Scopes to request
};

// Add Amplify configuration
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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);