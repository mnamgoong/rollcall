import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure({
    ...config,
    API: {
        endpoints: [
            {
                name: "sendFormData",
                endpoint: config.aws_cloud_logic_custom[0].endpoint
            }
        ]
    },
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_MpZMXQa4l',
        userPoolWebClientId: '19umo3t0j5v52lvq8vmidkehtg'
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();