// src/App.js
import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './Components/auth/LoginPage';
import LoadingPage from './Components/auth/LoadingPage';
import ErrorPage from './Components/auth/ErrorPage';
import Dashboard from './Screens/Dashboard';
import CreateTrip from './Screens/CreateTrip/CreateTrip';
import MyTrips from './Screens/MyTrips/Overview';
import Help from './Screens/Help';

function App() {
  const auth = useAuth();
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  if (auth.isLoading) {
    return <LoadingPage />;
  }

  if (auth.error) {
    return <ErrorPage error={auth.error} />;
  }

  if (!auth.isAuthenticated) {
    return <LoginPage onLogin={() => auth.signinRedirect()} />;
  }

  if (auth.isAuthenticated) {
    console.log('=== AUTH DEBUG INFO ===');
    console.log('Profile:', auth.user?.profile);
    console.log('Name:', auth.user?.profile.name);
    console.log('Access Token:', auth.user?.access_token);
    console.log('ID Token:', auth.user?.id_token);
    console.log('Expires At:', new Date(auth.user?.expires_at * 1000).toLocaleString());
    console.log('Full Auth Object:', auth);
    console.log('=== END AUTH DEBUG INFO ===');
  }

  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Create a Trip":
        return <CreateTrip setSelectedPage={setSelectedPage} />;
      case "My Trips":
        return <MyTrips />;
      case "Help":
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  const handleSignOut = async () => {
    // First clear the local auth state
    await auth.removeUser();
    
    // Then redirect to Cognito logout URL
    const cognitoDomain = "https://us-east-1mpeeh4bud.auth.us-east-1.amazoncognito.com";
    const clientId = "6ihgv04tth5if17o08l7liq1co";
    const logoutUri = "https://expo.d1gco6deqlx7f6.amplifyapp.com/"; // or your logout redirect URL
  
    window.location.href = 
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };


  return (
    <DashboardLayout
      userName={auth.user?.profile.name}
      onSignOut={handleSignOut}
      selectedPage={selectedPage}
      onPageSelect={setSelectedPage}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;