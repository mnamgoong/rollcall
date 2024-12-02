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

  return (
    <DashboardLayout 
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
    >
      {selectedPage === "Dashboard" && <Dashboard />}
      {selectedPage === "Create a Trip" && <CreateTrip setSelectedPage={setSelectedPage} />}
      {selectedPage === "My Trips" && <MyTrips />}
      {selectedPage === "Help" && <Help />}
    </DashboardLayout>
  );
}

export default App;