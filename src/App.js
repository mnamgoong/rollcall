import React, { useState, useEffect } from 'react';
import { 
  Authenticator, 
  useAuthenticator, 
  useTheme,
  View,
  Text,
  Heading,
  Button,
  Image
} from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './Screens/Dashboard';
import CreateTrip from './Screens/CreateTrip/CreateTrip';
import MyTrips from './Screens/MyTrips/Overview';
import Help from './Screens/Help';
import EditTrip from './Screens/EditTrips/EditTrip';
import logo from './Images/logo32.png';

// Customization components and form fields
const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="RollCall logo"
          src = {logo}
        />
      </View>
    );
  },
  Footer() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          RollCall&copy; All Rights Reserved
        </Text>
      </View>
    );
  },
 
};


function App() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [trips, setTrips] = useState([]);
  const [userAttributes, setUserAttributes] = useState(null);

  // Fetch user attributes on component mount
  useEffect(() => {
    const handleFetchUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
        console.log("User Attributes:", attributes);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    handleFetchUserAttributes();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userEmail = userAttributes?.email;
        if (!userEmail) {
          console.error("User email not available.");
          return;
        }

        const response = await fetch(
          `https://olt95t35ea.execute-api.us-east-1.amazonaws.com/dev/gettrips?email=${encodeURIComponent(userEmail)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTrips(data.data || []);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setTrips([]);
      }
    };

    if (userAttributes) {
      fetchTrips();
    }
  }, [userAttributes]);

  const renderContent = () => {
    switch (selectedPage) {
      case "Create a Trip":
        return (
          <CreateTrip
            setSelectedPage={setSelectedPage}
            tripData={selectedTripId ? trips.find((trip) => trip.id === selectedTripId) : null}
            isEditing={Boolean(selectedTripId)}
          />
        );
      case "Edit Trip":
        return (
          <EditTrip
            tripId={selectedTripId}
            onBack={() => setSelectedPage("My Trips")}
          />
        );
      case "My Trips":
        return (
          <MyTrips
            setSelectedPage={setSelectedPage}
            setSelectedTripId={setSelectedTripId}
          />
        );
      case "Help":
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Authenticator 
      components={components}
    >
      {({ signOut, user }) => (
        <DashboardLayout
          userName={userAttributes?.name || "Loading..."}
          onSignOut={signOut}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        >
          {renderContent()}
        </DashboardLayout>
      )}
    </Authenticator>
  );
}

export default App;