import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from './App';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mPEEh4Bud",  // Cognito authority URL
  client_id: "6ihgv04tth5if17o08l7liq1co",  // Your Cognito client ID
  redirect_uri: "https://final.d1gco6deqlx7f6.amplifyapp.com",  // URL to redirect after login
  response_type: "code",  // OAuth response type
  scope: "email openid phone",  // Scopes to request
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);